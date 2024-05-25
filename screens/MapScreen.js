import { useEffect, useRef, useState } from "react";
import { GOOGLE_MAPS_API_KEY } from "../constants/secrets";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"; // Reference: https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
import Constants from "expo-constants";
import * as Location from "expo-location";
import { Dimensions, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper"; // Reference: https://callstack.github.io/react-native-paper/getting-started.html
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"; // Reference: https://github.com/FaridSafi/react-native-google-places-autocomplete
import { COORD_DELTA, LONDON } from "../constants/map";
import { MAP_CONFIG } from "../config/map";
import { ROUTES } from "../constants/routes";
import useGlobalStore from "../stores/useGlobalStore";
import useStationsAround from "../hooks/useStationsAround";
import usePreferencesHaveChanged from "../hooks/usePreferencesHaveChanged";
import usePersistentStore from "../stores/usePersistentStore";
import { computeWhereToUpdateTo, removeFetchOverlap } from "../utils/map-utils";
import { filterStations, statusToColour } from "../utils/station-utils";
import { createModalOneOption } from "../utils/generic-utils";
import { NETWORK_ERROR } from "../constants/messages";
import Spinner from "../components/Spinner";
import NothingFound from "../components/NothingFound";
import MapIcons from "../components/MapIcons";

/**
 * A JSX component representing Map Screen.
 */
export default function MapScreen({ navigation }) {
  // Component references
  const mapRef = useRef(null);
  const searchRef = useRef(null);

  // Local state
  const [stations, setStations] = useState([]); // All stations ever fetched
  const [stationsFiltered, setStationsFiltered] = useState([]);
  const [userPhysicalRegion, setUserPhysicalRegion] = useState(null);

  // Global state
  const userPreferences = usePersistentStore((state) => state.filtersApplied);
  const userMapRegion = useGlobalStore((state) => state.userMapRegion); // Represents region on the map as the user drags the map around
  const setUserMapRegion = useGlobalStore((state) => state.setUserMapRegion);

  // Hooks
  const [preferencesChanged] = usePreferencesHaveChanged(userPreferences); // When preferences change, trigger filtering
  const [stationsAround, isLoading, serviceError] = useStationsAround(
    userMapRegion,
    userPreferences
  );

  // Side-effects
  useEffect(() => {
    if (stationsAround) {
      setStations((prevState) => {
        return removeFetchOverlap(prevState, stationsAround);
      }); // All stations ever fetched (used as the basis for filtering)
    } else {
      createModalOneOption("Error", NETWORK_ERROR); // API limit reached
    }
  }, [stationsAround]); // Whenever new data comes, update the state

  useEffect(() => {
    preferencesChanged
      ? setStationsFiltered(filterStations(stations, userPreferences))
      : setStationsFiltered(stations);
  }, [stations]); // Keep this variable in sync with `stations`, but only filter if user preferences have changed

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setUserPhysicalRegion(LONDON); // Fallback location, if they disallow location services
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setUserPhysicalRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: COORD_DELTA,
        longitudeDelta: COORD_DELTA,
      });
    })();
  }, []);

  // Event handlers
  const handleRegionChange = (userCoords, region, fetchedStations) => {
    setUserMapRegion(
      computeWhereToUpdateTo(userCoords, region, fetchedStations)
    ); // Sets state, considering if the user stepped outside the fetching radius or not, if yes, we update
  };

  const handlePlaceSearch = (latitude, longitude) => {
    mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: COORD_DELTA,
      longitudeDelta: COORD_DELTA,
    }); // Fly the user to the map region they have searched for
    searchRef.current.clear();
  };

  // Async- and error-handlers
  if (isLoading || !userPhysicalRegion) {
    return <Spinner />;
  }

  if (serviceError) {
    createModalOneOption("Error", serviceError);
  }

  return (
    <>
      {stationsFiltered && userPhysicalRegion ? (
        <View style={styles.container}>
          <MapView
            ref={mapRef}
            style={styles.map}
            showsUserLocation={true}
            followsUserLocation={true}
            customMapStyle={MAP_CONFIG}
            zoomControlEnabled={false}
            toolbarEnabled={false}
            provider={PROVIDER_GOOGLE}
            initialRegion={userPhysicalRegion}
            onRegionChangeComplete={(region) =>
              handleRegionChange(userMapRegion, region, stationsFiltered)
            }
          >
            {/* Create JSX elements for station markers */}
            {stationsFiltered.map((station) => {
              // Pin color decided based on station availability
              return (
                <Marker
                  pinColor={statusToColour(station.status)}
                  key={station.id}
                  coordinate={{
                    latitude: station.location.coordinates[1],
                    longitude: station.location.coordinates[0],
                  }}
                  onPress={() =>
                    navigation.navigate(ROUTES.Station, {
                      stationId: station.id,
                    })
                  }
                />
              );
            })}
          </MapView>
          {/* Searchbar */}
          <View style={styles.searchBar}>
            <GooglePlacesAutocomplete
              ref={searchRef}
              placeholder="Postcode, town or city"
              fetchDetails={true}
              onPress={(data, details = null) => {
                handlePlaceSearch(
                  details.geometry.location.lat,
                  details.geometry.location.lng
                );
              }}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: "en",
                components: "country:uk",
              }}
              textInputProps={{
                InputComp: Searchbar,
                clearButtonMode: "never",
              }}
            />
          </View>
          {/* Map Icons */}
          <MapIcons
            navigation={navigation}
            geolocation={userPhysicalRegion}
            handlePlaceSearch={handlePlaceSearch}
            setUserMapRegion={setUserMapRegion}
          />
        </View>
      ) : (
        <NothingFound message="Map could not be loaded due to a network error, try refreshing the application" />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchBar: {
    position: "absolute",
    marginTop: Constants.statusBarHeight,
    width: "90%",
  },
});
