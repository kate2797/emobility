import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import { saveUserToFirestore } from "../services/firestore";
import { REGISTRATION_ERROR } from "../constants/messages";

/**
 * A custom hook with logic to register a user.
 */
export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [serviceError, setServiceError] = useState("");
  const DEFAULT_BALANCE = 5.0; // Funds to start off

  const registerUser = async (fullName, email, password, chosenCar) => {
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ); // Creates a new user
      await updateProfile(user, { displayName: fullName }); // Set name to be used in the UI
      const userData = {
        fullName,
        email,
        cars: [
          {
            carId: chosenCar.id,
            name: `${chosenCar.make} ${chosenCar.model}`, // Store as a combined string
          },
        ], // EV selected at registration
        likedStations: [],
        balance: DEFAULT_BALANCE,
        dateRegistered: new Date(),
      };
      await saveUserToFirestore(userData);
    } catch (error) {
      setServiceError(REGISTRATION_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return [registerUser, isLoading, serviceError];
}
