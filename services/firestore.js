import {
  addDoc,
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { getNextDay, truncateTime } from "../utils/booking-utils";
import { BookingStatus } from "../constants/defaults";

/**
 * Saves a user to the database
 */
export const saveUserToFirestore = async (userData) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const userDocRef = doc(db, "users", uid); // User document
      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) {
        await setDoc(userDocRef, userData); // Save user into the database if we have no entries on them yet
      }
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Gets user's balance
 */
export const getUserBalance = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.get("balance");
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Gets user's car data
 */
export const getUserCars = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.get("cars");
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Sets user's balance to the given value
 */
export const setUserBalance = async (uid, newBalance) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, { balance: newBalance });
  } catch (error) {
    throw error;
  }
};

/**
 * Bookmarks a station
 */
export const bookmarkStation = async (uid, station) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const bookmarked = docSnap.get("likedStations"); // Array of bookmarks
      bookmarked.push(station); // Add a new one
      await updateDoc(userDocRef, { likedStations: bookmarked }); // Update Firestore
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Returns reference to user's document
 */
export const getUserDocument = (uid) => {
  return doc(db, "users", uid);
};

/**
 * Gets all bookmarks of for a given user
 */
export const getBookmarksByUserId = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.get("likedStations"); // Return the array of all bookmarks
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Creates a new booking instance in the database
 */
export const saveBookingToFirestore = async (bookingData) => {
  try {
    await addDoc(collection(db, "bookings"), bookingData);
  } catch (error) {
    throw error;
  }
};

/**
 * Queries the `bookings` collection to get all bookings made by a user with the given uid
 */
export const getBookingsByUserIdQuery = (uid) => {
  return query(
    collection(db, "bookings"),
    where("userId", "==", uid),
    where("status", "!=", BookingStatus.CANCELLED),
    orderBy("status"),
    orderBy("arrivalDateTime") // Sort in ascending order
  );
};

/**
 * Sets the status of booking to be `cancelled`, thus cancels booking
 */
export const cancelBooking = async (bookingId, newStatus) => {
  try {
    const bookingDocRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingDocRef, { status: newStatus });
  } catch (error) {
    throw error;
  }
};

/**
 * Queries the `bookings` collection to get bookings for a `single day`, that the user wants
 */
export const getBookedSlotsForChargerForDayQuery = (chargerId, arrivalDate) => {
  const dayStartTimestamp = truncateTime(arrivalDate); // Start of the day, at 00:00
  const dayEndTimestamp = getNextDay(arrivalDate); // End of the day, before 00:00
  const bookingsRef = collection(db, "bookings");
  return query(
    bookingsRef,
    where("chargerId", "==", chargerId),
    where("arrivalDateTime", ">=", dayStartTimestamp), // Catch day start
    where("arrivalDateTime", "<", dayEndTimestamp), // Catch day end
    where("status", "==", BookingStatus.ISSUED), // Only active bookings
    orderBy("arrivalDateTime")
  );
};
