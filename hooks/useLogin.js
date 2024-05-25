import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { LOGIN_ERROR } from "../constants/messages";

/**
 * A custom hook with logic to log in a user.
 */
export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [serviceError, setServiceError] = useState("");

  const loginUser = async (email, password) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setServiceError(LOGIN_ERROR); // When username and/or password is invalid
    } finally {
      setIsLoading(false);
    }
  };

  return [loginUser, isLoading, serviceError, setServiceError];
}
