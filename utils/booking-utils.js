import { addMinutes, areIntervalsOverlapping } from "date-fns"; // Reference: https://date-fns.org/
import { DEFAULT_FEE } from "../constants/defaults";
import { Alert } from "react-native";

/**
 * Finds and obtains charger speed from a charger object by ID
 */
export const getChargerSpeed = (station, chargerId) => {
  for (let i = 0; i < station.evses.length; i++) {
    for (let j = 0; j < station.evses[i].connectors.length; j++) {
      let connector = station.evses[i].connectors[j];
      if (connector.id === chargerId) {
        return connector.power;
      }
    }
  }
};

/**
 * Computes charge time in minutes for a given car
 */
export const computeChargeTimeInMinutes = (
  initialCharge,
  desiredCharge,
  chargerSpeed,
  usableBattery
) => {
  const timeFull = usableBattery / chargerSpeed; // Time to charge the given vehicle from 0 to 100%
  return timeFull * ((desiredCharge - initialCharge) / 100) * 60;
};

/**
 * Merges the date and time into a single object
 */
export const combineDateAndTime = (date, time) => {
  // Obtain date information from arrivalDate
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  // Obtain time information from arrivalTime
  const hours = time.getHours();
  const minutes = time.getMinutes();
  return new Date(year, month, day, hours, minutes);
};

/**
 * Suggests exit time from a charging station based on desired arrival time and expected length of the charging session
 * Uses date-fns for the addition of minutes to a date. Reference: https://date-fns.org/v2.29.1/docs/addMinutes
 */
export const computeExitDateTime = (arrivalDateTime, chargeTimeInMinutes) => {
  return addMinutes(arrivalDateTime, chargeTimeInMinutes);
};

/**
 * Maps a timestamp data type into a locate Date string
 */
export const timestampToLocaleString = (timestamp) => {
  const toMilliseconds = timestamp.seconds * 1000;
  const localeString = new Date(toMilliseconds).toLocaleString();
  return localeString.split(", "); // Returns an array of [date, time]
};

/**
 * Formats locale time to exclude seconds
 */
export const formatLocaleTime = (timeString) => {
  let result;
  if (timeString) {
    const timeData = timeString.split(":");
    result = `${timeData[0]}:${timeData[1]}`;
  } else {
    result = timeString;
  }
  return result;
};

/**
 * Formats raw Date to display only the time portion
 */
export const dateToLocaleTime = (rawDate) => {
  const [, time] = rawDate.toLocaleString().split(", ");
  return formatLocaleTime(time);
};

/**
 * Maps a timestamp data type into a native Date format
 */
export const timestampToDate = (timestamp) => {
  const toMilliseconds = timestamp.seconds * 1000;
  return new Date(toMilliseconds);
};

/**
 * Checks if the user has enough balance to make a booking
 */
export const hasEnoughBalance = (balance) => {
  return balance >= DEFAULT_FEE;
};

/**
 * Turns start and end date into a time interval
 */
export const toInterval = (startDate, endDate) => {
  return {
    start: startDate,
    end: endDate,
  };
};

/**
 * Finds the first available slot for the user when their time is already taken
 * Uses date-fns for the addition of minutes to a date. Reference: https://date-fns.org/v2.29.1/docs/addMinutes
 * Uses date-fns to determine whether there is an overlap between two intervals. Reference: https://bit.cloud/date-fns/date-fns/are-intervals-overlapping
 */
export const getReplacement = (slots, userTarget, chargeTime) => {
  if (!slots.length) return null; // No need for a replacement as there are no slots

  if (slots.length === 1) {
    if (!areIntervalsOverlapping(slots[0], userTarget)) {
      return null; // No need for a replacement if no overlap with this single slot
    } else {
      return toInterval(slots[0].end, addMinutes(slots[0].end, chargeTime)); // Adjust start time
    }
  }
  // Loop over slot bookings
  for (let i = 0; i < slots.length - 1; i++) {
    let currentSlot = slots[i];
    let hasOverlapWithCurrent = areIntervalsOverlapping(
      currentSlot,
      userTarget
    );
    let nextSlot = slots[i + 1];
    let hasOverlapWithNext = areIntervalsOverlapping(nextSlot, userTarget);

    if (slots.length === 2) {
      // If `curr` is overlapping, check `next`, the code below this `if` will handle that
      // Only handle when `curr` has no clash, but `next` has, then, there is nothing to look at afterwards
      if (hasOverlapWithNext) {
        // Take the end time of `next` but keep our original duration as there is nothing else afterwards
        return toInterval(nextSlot.end, addMinutes(nextSlot.end, chargeTime));
      }
    }

    if (!hasOverlapWithNext && !hasOverlapWithCurrent) {
      return null; // No need for a replacement as there is no clash, it fits in
    } else if (hasOverlapWithCurrent) {
      // If `curr` overlaps, but not `next`, suggest new start but preserve the original duration
      let newStart = currentSlot.end;
      let newEnd = addMinutes(currentSlot.end, chargeTime); // Account for the duration they wanted
      let potentialSlot = { start: newStart, end: newEnd };

      // Re-check with `next`, if this potential slot, accounting for their duration can fit
      hasOverlapWithNext = areIntervalsOverlapping(nextSlot, potentialSlot);
      if (hasOverlapWithNext) {
        return toInterval(currentSlot.end, nextSlot.start); // If there is an overlap with `next`, suggest anything that is available
      } else {
        return potentialSlot; // If no overlap with `next`, account for the duration they wanted
      }
    }
  }
};

/**
 * Checks if the suggested slot will provide the user with at least 20% charge
 */
export const providesEnoughCharge = (
  usableBattery,
  chargerSpeed,
  replacement
) => {
  let timeFullInMins = (usableBattery / chargerSpeed) * 60; // Duration to get 100% charge
  let replacementDurationInMins =
    (replacement.end.getTime() - replacement.start.getTime()) / 60000;
  let toTwenty = timeFullInMins * 0.2; // Duration to get 20% charge
  return replacementDurationInMins > toTwenty;
};

/**
 * Checks if the offered slot starts on the same day that the user wants
 */
export const startsOnTheSameDay = (replacementStart, desiredStart) => {
  const sameDate = replacementStart.getDate() === desiredStart.getDate();
  const sameMonth = replacementStart.getMonth() === desiredStart.getMonth();
  const sameYear = replacementStart.getYear() === desiredStart.getYear();
  return sameDate && sameMonth && sameYear;
};

/**
 * Creates a modal window to either accept or reject the suggested charging slot
 */
export const createConfirmReplacementAlert = (
  message,
  cancel,
  book,
  startTime,
  endTime
) =>
  Alert.alert("Confirmation", message, [
    {
      text: "Dismiss",
      onPress: () => cancel(),
      style: "cancel",
    }, // Clear the selection
    { text: "Book for £1", onPress: () => book(startTime, endTime) },
  ]);

/**
 * Creates a modal window to book a slot
 */
export const createBookingAlert = (message, book, startTime, endTime) =>
  Alert.alert("Confirmation", message, [
    { text: "Dismiss", style: "cancel" },
    { text: "Book for £1", onPress: () => book(startTime, endTime) },
  ]);

/**
 * Creates a modal window to cancel booking
 */
export const createCancellationAlert = (message, cancelBooking, bookingID) => {
  Alert.alert("Confirmation", message, [
    { text: "Dismiss", style: "cancel" },
    { text: "Cancel for £2", onPress: () => cancelBooking(bookingID) },
  ]);
};

/**
 * Turns minutes into a formatted hour and minute string
 */
export const getFormattedSessionDuration = (minutes) => {
  let minutesPart = 0;
  let hoursPart = 0;
  if (minutes >= 0) {
    minutesPart = minutes % 60;
    hoursPart = Math.floor(minutes / 60);
  }
  return hoursPart === 1
    ? `${hoursPart} hour and ${Math.floor(minutesPart)} minutes`
    : `${hoursPart} hours and ${Math.floor(minutesPart)} minutes`; // If hour is 1, show singular `hour`
};

/**
 * Adds one day to a Date object
 */
export const getNextDay = (arrivalDate) => {
  const day = arrivalDate.getDate();
  const month = arrivalDate.getMonth();
  const year = arrivalDate.getFullYear();
  return new Date(year, month, day + 1);
};

/**
 * Truncates Date object to disregard the time portion
 */
export const truncateTime = (arrivalDate) => {
  const day = arrivalDate.getDate();
  const month = arrivalDate.getMonth();
  const year = arrivalDate.getFullYear();
  return new Date(year, month, day);
};
