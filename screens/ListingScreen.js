import { ScrollView, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import stylesheet from "../styles/stylesheet";
import useGlobalStore from "../stores/useGlobalStore";
import useStationsAround from "../hooks/useStationsAround";
import useReverseGeocoding from "../hooks/useReverseGeocoding";
import Address from "../components/Address";
import StationCard from "../components/StationCard";
import { Chip } from "react-native-paper";
import NothingFound from "../components/NothingFound";
import usePersistentStore from "../stores/usePersistentStore";
import {
  getFormattedGoogleAddress,
  isAlreadyBookmarked,
} from "../utils/station-utils";
import { bookmarkStation, getBookmarksByUserId } from "../services/firestore";
import Spinner from "../components/Spinner";
import { createModalOneOption } from "../utils/generic-utils";
import { BOOKMARK_SUCCESS, BOOKMARK_WARNING } from "../constants/messages";

/**
 * A JSX component representing Listing Screen.
 */
export default function ListingScreen({ navigation }) {
  const STATION_DISPLAY_LIMIT = 5;
  const [nearestStations, setNearestStations] = useState([]);
  const [bookmarkingError, setBookmarkingError] = useState("");

  // Global state
  const userPreferences = usePersistentStore((state) => state.filtersApplied);
  const userMapRegion = useGlobalStore((state) => state.userMapRegion);
  const user = useGlobalStore((state) => state.currentUser);

  // Hooks
  const [stationsAround, dataIsLoading, dataError] = useStationsAround(
    userMapRegion,
    userPreferences
  ); // Fetch stations around from Chargetrip
  const [address, geocodingIsLoading, geocodingError] =
    useReverseGeocoding(userMapRegion); // Logic to geocode user's location

  // Side effects
  useEffect(() => {
    if (stationsAround) {
      setNearestStations(stationsAround); // Account for the API limit reached
    }
  }, [stationsAround]); // Perform the effect of saving the API response to local state everytime new data comes

  // Event handlers
  const handleBookmark = async (stationId, stationName) => {
    try {
      // Has it already been bookmarked?
      const allBookmarks = await getBookmarksByUserId(user?.uid);
      if (isAlreadyBookmarked(stationId, allBookmarks)) {
        createModalOneOption("Warning", BOOKMARK_WARNING);
      } else {
        // Proceed with bookmarking
        const station = {
          stationId,
          stationName,
        }; // Assemble the station
        await bookmarkStation(user?.uid, station);
        createModalOneOption("Success", BOOKMARK_SUCCESS);
      }
    } catch (error) {
      setBookmarkingError("Sorry, something went wrong");
    }
  };

  // Async- and error-handlers
  if (dataIsLoading || geocodingIsLoading) {
    return <Spinner />;
  }

  if (dataError) {
    createModalOneOption("Error", dataError);
  }

  if (bookmarkingError) {
    createModalOneOption("Error", bookmarkingError);
  }

  return (
    <>
      <Header title="Nearest 5 Stations" />
      <SafeAreaView edges={["top"]} style={stylesheet.safeArea}>
        <ScrollView style={stylesheet.cardView}>
          {/* Only render the Address component after we have the address */}
          {address ? (
            <Address
              address={
                geocodingError
                  ? geocodingError
                  : getFormattedGoogleAddress(address)
              }
            />
          ) : null}
          <Chip icon="information">
            Click on a station to see more information
          </Chip>
          {/* Render a fallback UI if no stations match the criteria */}
          {!nearestStations.length && !dataError && !dataIsLoading ? (
            <NothingFound message="Sorry, no stations found around your location" />
          ) : null}
          {/* Only create StationCard components after we have the station data */}
          {nearestStations.length
            ? nearestStations.slice(0, STATION_DISPLAY_LIMIT).map((station) => {
                return (
                  <StationCard
                    key={station.id}
                    station={station}
                    userLocation={userMapRegion}
                    navigation={navigation}
                    handleBookmark={() =>
                      handleBookmark(station.id, station.name)
                    }
                  />
                );
              })
            : null}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
