import { useEffect } from "react";
import { auth } from "../config/firebase";
import useGlobalStore from "../stores/useGlobalStore";

/**
 * A custom hook with logic to retrieve the current user from the Authentication service.
 */
export default function useCurrentUser() {
  const setCurrentUser = useGlobalStore((state) => state.setCurrentUser); // Retrieve the setter function from my Zustand store
  const currentUser = useGlobalStore((state) => state.currentUser);

  useEffect(() => {
    const unsubscribeFromAuthObserver = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribeFromAuthObserver(); // Cancel all subscriptions before the component unmounts
      // Reference: https://dev.to/dchowitz/react-firebase-a-simple-context-based-authentication-provider-1ool
    };
  }, []);

  return [currentUser];
}
