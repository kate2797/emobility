import { useEffect, useState } from "react";
import { GEOCODING_BASE_URL } from "../constants/map";
import { GOOGLE_MAPS_API_KEY } from "../constants/secrets";
import { GEOCODING_ERROR } from "../constants/messages";

/**
 * A custom hook with logic to reverse-geocode a pair of coordinates.
 */
export default function useReverseGeocoding(coords) {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serviceError, setServiceError] = useState("");

  const useReverseGeocoding = async (coords) => {
    const url = `${GEOCODING_BASE_URL}${coords.latitude},${coords.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    setIsLoading(true);
    try {
      const response = await fetch(url); // Call to Google's geocoding server
      const geoData = await response.json();
      setAddress(geoData["results"][0]["formatted_address"]);
    } catch (error) {
      setAddress(`${coords.latitude}, ${coords.longitude}`);
      setServiceError(GEOCODING_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void useReverseGeocoding(coords);
  }, [coords]); // Reverse geocode the user location everytime it changes

  return [address, isLoading, serviceError];
}
