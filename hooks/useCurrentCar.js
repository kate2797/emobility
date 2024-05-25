import { useEffect, useState } from "react";
import { getUserCars } from "../services/firestore";
import { NETWORK_ERROR } from "../constants/messages";

/**
 * A custom hook with logic to retrieve the EV a user registered with from the database.
 */
export default function useCurrentCar(uid) {
  const [isLoading, setIsLoading] = useState(false);
  const [serviceError, setServiceError] = useState("");
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const retrieveCars = async () => {
      setIsLoading(true);
      setServiceError("");
      try {
        const carsData = await getUserCars(uid); // Getting cars from the database
        setCars(carsData);
      } catch (error) {
        setServiceError(NETWORK_ERROR);
      } finally {
        setIsLoading(false);
      }
    };
    void retrieveCars();
  }, []);
  let car = cars[0];

  return [car, isLoading, serviceError];
}
