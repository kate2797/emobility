import { useEffect, useState } from "react";
import { client } from "../config/chargetrip";
import { GET_STATIONS_AROUND } from "../services/chargetrip-queries";
import { NETWORK_ERROR } from "../constants/messages";

/**
 * A custom hook with logic to fetch 40 stations from Chargetrip.
 */
export default function useStationsAround(userMapRegion, userPreferences) {
  const [isLoading, setIsLoading] = useState(false);
  const [serviceError, setServiceError] = useState("");
  const [stationsAround, setStationsAround] = useState([]);

  useEffect(() => {
    // Perform the effect only after we have received user preferences
    if (userPreferences) {
      const getStationsAround = async ({
        location,
        power_groups,
        connectors,
        distance = 5000,
      }) => {
        try {
          const response = await client
            .query(GET_STATIONS_AROUND, {
              filter: {
                location,
                power_groups,
                connectors,
                distance,
              },
            })
            .toPromise();
          setStationsAround(response.data?.stationAround);
        } catch (error) {
          setServiceError(NETWORK_ERROR);
        } finally {
          setIsLoading(false);
        }
      };
      void getStationsAround({
        location: {
          type: "Point",
          coordinates: [userMapRegion.longitude, userMapRegion.latitude],
        },
        power_groups: userPreferences.speed,
        connectors: userPreferences.connectors,
      });
    }
  }, [userMapRegion, userPreferences]);

  return [stationsAround, isLoading, serviceError]; // Return the stations, loading and error states
}
