import { ScrollView, SafeAreaView } from "react-native";
import Header from "../components/Header";
import stylesheet from "../styles/stylesheet";
import {
  cancelBooking,
  getBookingsByUserIdQuery,
  getUserBalance,
  setUserBalance,
} from "../services/firestore";
import useGlobalStore from "../stores/useGlobalStore";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { hasEnoughBalance, timestampToDate } from "../utils/booking-utils";
import { BookingStatus, CANCELLATION_FEE } from "../constants/defaults";
import { createModalOneOption } from "../utils/generic-utils";
import {
  BALANCE_WARNING,
  BOOKING_SUCCESS_CANCEL,
  NETWORK_ERROR,
} from "../constants/messages";
import BookingsContainer from "../components/BookingsContainer";
import NothingFound from "../components/NothingFound";

/**
 * A JSX component representing BookingHistory Screen.
 */
export default function BookingHistoryScreen() {
  const user = useGlobalStore((state) => state.currentUser);
  const [bookings, setBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [serviceError, setServiceError] = useState("");
  const [isRefreshed, setIsRefreshed] = useState(false); // Keep refreshing the data periodically

  // Side effects
  useEffect(() => {
    const time = setInterval(
      () => setIsRefreshed((prevState) => !prevState),
      30000 // Call every 30 seconds
    );
    return () => {
      clearInterval(time); // Clean-up when the component unmounts
    };
  }, []);

  useEffect(() => {
    const bookingsQuery = getBookingsByUserIdQuery(user?.uid); // Get query to return all bookings
    setBookings([]); // Reset
    const unsubscribeFromFirestore = onSnapshot(
      bookingsQuery,
      (querySnap) => {
        let bookingSnap = [];
        let bookingSnapPast = [];
        querySnap.forEach((doc) => {
          timestampToDate(doc.get("arrivalDateTime")).getTime() <=
          new Date().getTime()
            ? bookingSnapPast.unshift({ ...doc.data(), bookingId: doc.id })
            : bookingSnap.push({ ...doc.data(), bookingId: doc.id }); // Distinguish between current and past
        });
        setBookings(bookingSnap);
        setPastBookings(bookingSnapPast);
      },
      () => {
        setServiceError(NETWORK_ERROR);
      }
    );
    return () => unsubscribeFromFirestore();
  }, [isRefreshed]);

  // Event handlers
  const handleCancellation = async (bookingId) => {
    try {
      const balance = await getUserBalance(user?.uid);
      if (!hasEnoughBalance(balance)) {
        createModalOneOption("Warning", BALANCE_WARNING); // Check funds prior
      } else {
        await cancelBooking(bookingId, BookingStatus.CANCELLED); // Set to cancelled
        await setUserBalance(user?.uid, balance - CANCELLATION_FEE); // Take the fee
        createModalOneOption("Success", BOOKING_SUCCESS_CANCEL);
      }
    } catch (error) {
      setServiceError(NETWORK_ERROR);
    }
  };

  if (serviceError) {
    createModalOneOption("Error", serviceError);
  }

  return (
    <>
      <Header title="Booking History" />
      <SafeAreaView edges={["top"]} style={stylesheet.safeArea}>
        <ScrollView style={stylesheet.cardView}>
          {!bookings.length && !pastBookings.length ? (
            <NothingFound message="Your booking history is empty" />
          ) : (
            <BookingsContainer
              bookings={bookings}
              pastBookings={pastBookings}
              handleCancellation={handleCancellation}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
