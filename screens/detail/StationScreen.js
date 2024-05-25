import { ScrollView, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import StationInfo from "../../components/StationInfo";
import ChargerList from "../../components/ChargerList";
import stylesheet from "../../styles/stylesheet";
import { useEffect } from "react";
import useStationDetail from "../../hooks/useStationDetail";
import useGlobalStore from "../../stores/useGlobalStore";
import { FALLBACK_STATION } from "../../constants/defaults";
import { handleNullProperties } from "../../utils/cleaning-utils";
import Spinner from "../../components/Spinner";
import { createModalOneOption } from "../../utils/generic-utils";

/**
 * A JSX component representing Station Screen.
 */
export default function StationScreen({ route, navigation }) {
  // Navigation, global state and hooks
  const { stationId } = route.params; // Get station ID from the navigation
  const currentStation = useGlobalStore((state) => state.currentStation);
  const setCurrentStation = useGlobalStore((state) => state.setCurrentStation);
  const [station, isLoading, serviceError] = useStationDetail(stationId); // Logic for retrieving a station

  // Side effects
  useEffect(() => {
    setCurrentStation(handleNullProperties(station, FALLBACK_STATION)); // Clean the station before passing it to other components
  }, [station]);

  // Async- and error-handlers
  if (isLoading) {
    return <Spinner />;
  }

  if (serviceError) {
    createModalOneOption("Error", serviceError);
  }

  return (
    <>
      {currentStation && (
        <>
          <Header
            title={`Station ${currentStation.name}`}
            navigation={navigation}
          />
          <SafeAreaView edges={["top"]} style={stylesheet.safeAreaNoMargin}>
            <ScrollView>
              <StationInfo />
              <ChargerList navigation={navigation} />
            </ScrollView>
          </SafeAreaView>
        </>
      )}
    </>
  );
}
