import { useEffect, useState } from "react";
import { client } from "../config/chargetrip";
import { GET_STATION_DETAILS } from "../services/chargetrip-queries";
import { NETWORK_ERROR } from "../constants/messages";

/**
 * A custom hook with logic to retrieve information about an individual station from Chargetrip.
 */
export default function useStationDetail(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [serviceError, setServiceError] = useState("");
  const [station, setStation] = useState([]);

  useEffect(() => {
    const getStationDetail = async (id) => {
      setIsLoading(true);
      try {
        const response = await client
          .query(GET_STATION_DETAILS, {
            stationId: id,
          })
          .toPromise();
        setStation(response.data?.station); // Set state after the promise is resolved
      } catch (error) {
        setServiceError(NETWORK_ERROR);
      } finally {
        setIsLoading(false);
      }
    };
    void getStationDetail(id); // Fetch data
  }, []); // Run on mount

  return [station, isLoading, serviceError];
}
