import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

/**
 * A custom hook with logic to log out a user.
 */
export default function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const [serviceError, setServiceError] = useState("");

  const logoutUser = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      setServiceError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return [logoutUser, isLoading, serviceError];
}
