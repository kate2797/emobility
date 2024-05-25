import { Platform, StyleSheet, Text, View } from "react-native";
import { Chip, DataTable, Divider } from "react-native-paper";
import { useEffect, useState } from "react";
import stylesheet from "../styles/stylesheet";
import { SIDE_MARGIN } from "../constants/ui";
import { addMinutes } from "date-fns"; // Reference: https://date-fns.org/v2.29.1/docs/addMinutes
import { onSnapshot } from "firebase/firestore";
import {
  DEFAULT_FEE,
  DEFAULT_STATUS,
  FALLBACK_CAR_ID,
  TIME_BUFFER,
} from "../constants/defaults";
import {
  getBookedSlotsForChargerForDayQuery,
  getUserBalance,
  saveBookingToFirestore,
  setUserBalance,
} from "../services/firestore";
import {
  computeChargeTimeInMinutes,
  combineDateAndTime,
  computeExitDateTime,
  createConfirmReplacementAlert,
  createBookingAlert,
  getReplacement,
  hasEnoughBalance,
  providesEnoughCharge,
  toInterval,
  dateToLocaleTime,
  startsOnTheSameDay,
  getFormattedSessionDuration,
  timestampToDate,
} from "../utils/booking-utils";
import { createModalOneOption } from "../utils/generic-utils";
import {
  BALANCE_WARNING,
  BOOKING_SUCCESS,
  BOOKING_WARNING_CHARGE_TIME,
  BOOKING_WARNING_SLOTS,
  NETWORK_ERROR,
} from "../constants/messages";
import useCars from "../hooks/useCars";
import useCurrentCar from "../hooks/useCurrentCar";
import Spinner from "./Spinner";
import SliderContainer from "./SliderContainer";
import PickerContainer from "./PickerContainer";
import ButtonLarge from "./ButtonLarge";
import FAQContainer from "./FAQContainer";
import AndroidPickerContainer from "./AndroidPickerContainer";
import Departure from "./Departure";
import DepartureAndroid from "./DepartureAndroid";

/**
 * A JSX component dealing with charge point booking.
 */
export default function MakeBooking({
  chargerId,
  externalChargerId,
  chargerName,
  chargerSpeed,
  station,
  user,
}) {
  // API state
  const [isLoading, setIsLoading] = useState(false);
  const [serviceError, setServiceError] = useState("");

  // Hooks
  const [car] = useCurrentCar(user?.uid);
  const [, , , getBatteryInfoById] = useCars(); // To get user's EV battery information
  const { usable_kwh: usableBattery } = getBatteryInfoById(
    car?.carId || FALLBACK_CAR_ID
  );

  // Local form state
  const [initialCharge, setInitialCharge] = useState(0);
  const [desiredCharge, setDesiredCharge] = useState(0);
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [arrivalDateTime, setArrivalDateTime] = useState(new Date());
  const [revealFAQs, setRevealFAQs] = useState(false);

  // Computed state
  const [chargeTime, setChargeTime] = useState(0);
  const [exitDateTime, setExitDateTime] = useState(new Date()); // Departure suggestion
  const isValidSliderState = initialCharge <= desiredCharge; // Initial charge must always be smaller
  const slidersPushedToZero = initialCharge === 0 && desiredCharge === 0; // If both 0, reset exitDateTime
  const [slots, setSlots] = useState(null);

  // Side effects
  useEffect(() => {
    setArrivalDateTime(combineDateAndTime(arrivalDate, arrivalDateTime));
  }, [arrivalDate]); // Synchronize the date with time in the combined picker

  useEffect(() => {
    if (slidersPushedToZero) setExitDateTime(arrivalDateTime); // If the user resets the sliders, reset exitDateTime
    const chargeTimeInMinutes = computeChargeTimeInMinutes(
      initialCharge,
      desiredCharge,
      chargerSpeed,
      usableBattery
    ); // Compute charge time, given the following parameters, and then set the state
    setChargeTime(chargeTimeInMinutes);
  }, [initialCharge, desiredCharge, arrivalDateTime]); // Recompute charge time whenever parameters change

  useEffect(() => {
    // If charge time and date have changed, and the slider state is valid, perform this effect
    if (chargeTime && isValidSliderState) {
      let suggestedExitDateTime = computeExitDateTime(
        arrivalDateTime,
        chargeTime
      ); // Accounts for date flip
      setExitDateTime(suggestedExitDateTime);
    }
  }, [arrivalDateTime, chargeTime]); // Synchronise states to produce exit time

  useEffect(() => {
    const bookingsQuery = getBookedSlotsForChargerForDayQuery(
      chargerId,
      arrivalDate
    ); // Get slots in real-time
    const unsubscribeFromFirestore = onSnapshot(
      bookingsQuery,
      (querySnap) => {
        let slotData = [];
        querySnap.forEach((doc) => {
          let timeSlot = {
            start: timestampToDate(doc.get("arrivalDateTime")),
            end: timestampToDate(doc.get("exitDateTime")),
          };
          slotData.push(timeSlot);
        });
        setSlots(slotData);
      },
      (error) => {
        setServiceError(NETWORK_ERROR);
      }
    );
    return () => unsubscribeFromFirestore(); // Clean-up function
  }, [arrivalDateTime]); // Re-run everytime new input comes

  // Event handlers
  const handleBooking = async (startTime, endTime) => {
    setIsLoading(true);
    setServiceError(""); // Reset
    try {
      const balance = await getUserBalance(user?.uid);
      if (!hasEnoughBalance(balance)) {
        createModalOneOption("Warning", BALANCE_WARNING);
      } else {
        const bookingData = assembleBookingData(startTime, endTime); // Create the booking object
        await saveBookingToFirestore(bookingData);
        await setUserBalance(user?.uid, balance - DEFAULT_FEE);
        createModalOneOption("Success", BOOKING_SUCCESS);
      }
    } catch (error) {
      setServiceError(NETWORK_ERROR);
    } finally {
      handleResetSelection(); // Clean up the user's selection after booking
      setIsLoading(false);
    }
  };

  const handleResetSelection = () => {
    setArrivalDateTime(new Date());
    setArrivalDate(new Date());
    setInitialCharge(0);
    setDesiredCharge(0);
    setChargeTime(0);
    setExitDateTime(new Date());
  };

  const assembleBookingData = (startTime, endTime) => {
    return {
      userId: user?.uid, // Safe
      stationId: station.id,
      chargerId: chargerId,
      arrivalDateTime: startTime,
      exitDateTime: addMinutes(endTime, TIME_BUFFER), // Add 10 min buffer to exitDateTime
      status: DEFAULT_STATUS,
      bookingFee: DEFAULT_FEE,
      dateCreated: new Date(),
      externalMetadata: {
        stationName: station.name,
        stationAddress: `${station.address}, ${station.city}`,
        externalChargerId: externalChargerId,
        chargerName: chargerName,
      },
    };
  };

  const handleCheckAvailability = (arrivalDateTime, exitDateTime) => {
    if (desiredCharge - initialCharge < 20) {
      createModalOneOption("Warning", BOOKING_WARNING_CHARGE_TIME);
      handleResetSelection();
      return; // Proceed to checking the availability otherwise
    }
    let userTarget = toInterval(
      arrivalDateTime,
      addMinutes(exitDateTime, TIME_BUFFER)
    ); // Assemble user preference
    let replacement = getReplacement(slots, userTarget, chargeTime); // Get replacement or null
    let message;
    if (!replacement) {
      message = "Slot available";
      createBookingAlert(message, handleBooking, arrivalDateTime, exitDateTime); // Proceed with booking right away
    } else {
      // Offer a slot, but first check if it will give them at least 20% charge, and it is for the day they want
      if (
        !providesEnoughCharge(usableBattery, chargerSpeed, replacement) ||
        !startsOnTheSameDay(replacement.start, arrivalDateTime)
      ) {
        createModalOneOption("Warning", BOOKING_WARNING_SLOTS);
      } else {
        // Update the state to be the slot we are suggesting, then offer an option to either accept or reject it
        message = `From ${dateToLocaleTime(
          replacement.start
        )} to ${dateToLocaleTime(
          replacement.end
        )} is the first available slot around your desired arrival`;
        setArrivalDateTime(replacement.start);
        setExitDateTime(replacement.end);
        createConfirmReplacementAlert(
          message,
          handleResetSelection,
          handleBooking,
          replacement.start,
          replacement.end
        );
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (serviceError) {
    createModalOneOption("Error", setServiceError);
  }

  return (
    <View style={stylesheet.filterContainer}>
      <View style={styles.content}>
        <Chip icon="numeric-1-circle" style={styles.chipFirst}>
          Configure your charging slot parameters
        </Chip>
        {/* Pickers */}
        {Platform.OS === "android" ? (
          <AndroidPickerContainer
            arrivalDate={arrivalDate}
            setArrivalDate={setArrivalDate}
            arrivalDateTime={arrivalDateTime}
            setArrivalDateTime={setArrivalDateTime}
          />
        ) : (
          <PickerContainer
            arrivalDate={arrivalDate}
            setArrivalDate={setArrivalDate}
            arrivalDateTime={arrivalDateTime}
            setArrivalDateTime={setArrivalDateTime}
          />
        )}
        {/* Sliders */}
        <SliderContainer
          initialCharge={initialCharge}
          setInitialCharge={setInitialCharge}
          desiredCharge={desiredCharge}
          setDesiredCharge={setDesiredCharge}
        />
        <Chip icon="numeric-2-circle" style={styles.chipMiddle}>
          Receive duration and departure suggestions
        </Chip>
        {/* Suggested Duration and Departure */}
        <DataTable.Title>Suggested Slot Duration</DataTable.Title>
        <Text>{getFormattedSessionDuration(chargeTime)}</Text>
        <Divider style={stylesheet.divider} />
        {Platform.OS === "android" ? (
          <DepartureAndroid exitDateTime={exitDateTime} />
        ) : (
          <Departure exitDateTime={exitDateTime} />
        )}
      </View>
      {/* Button */}
      <View style={styles.buttonContainer}>
        <ButtonLarge
          text="Check slot availability"
          onPress={() => handleCheckAvailability(arrivalDateTime, exitDateTime)}
        />
      </View>
      {/* FAQs */}
      <View style={styles.FAQContainer}>
        <Text onPress={() => setRevealFAQs((prevState) => !prevState)}>
          To learn more about the booking process, click here
        </Text>
      </View>
      {revealFAQs ? <FAQContainer /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginLeft: SIDE_MARGIN,
    marginRight: SIDE_MARGIN,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  FAQContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  chipFirst: {
    marginBottom: 20,
  },
  chipMiddle: {
    marginTop: 20,
    marginBottom: 20,
  },
});
