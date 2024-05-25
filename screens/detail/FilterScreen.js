import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";
import Header from "../../components/Header";
import stylesheet from "../../styles/stylesheet";
import { SIDE_MARGIN } from "../../constants/ui";
import useGlobalStore from "../../stores/useGlobalStore";
import EVFilterContainer from "../../components/EVFilterContainer";
import SpeedFilterContainer from "../../components/SpeedFilterContainer";
import ButtonLarge from "../../components/ButtonLarge";
import usePersistentStore from "../../stores/usePersistentStore";
import { useEffect, useState } from "react";
import { getUserCars } from "../../services/firestore";
import Spinner from "../../components/Spinner";
import { createModalOneOption } from "../../utils/generic-utils";
import { NETWORK_ERROR } from "../../constants/messages";

/**
 * A JSX component representing Filter Screen.
 */
export default function FilterScreen({ navigation }) {
  // Global state
  const user = useGlobalStore((state) => state.currentUser);
  const filtersApplied = usePersistentStore((state) => state.filtersApplied);
  const setFilters = usePersistentStore((state) => state.setFilters); // Sets the final preference

  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [serviceError, setServiceError] = useState("");
  const [cars, setCars] = useState([]);
  const [speeds, setSpeeds] = useState(filtersApplied.speed);

  // Side effects
  useEffect(() => {
    const retrieveCars = async () => {
      setIsLoading(true);
      setServiceError("");
      try {
        const carsData = await getUserCars(user?.uid);
        setCars(carsData);
      } catch (error) {
        setServiceError(NETWORK_ERROR);
      }
    };
    void retrieveCars();
    setIsLoading(false);
  }, []);

  // Async- and error-handlers
  if (isLoading) {
    return <Spinner />;
  }

  if (serviceError) {
    createModalOneOption("Error", serviceError);
  }

  return (
    <>
      <Header title="Filter Stations" navigation={navigation} />
      <SafeAreaView edges={["top"]} style={stylesheet.safeArea}>
        <ScrollView>
          {/* Filters */}
          <Chip icon="information" style={styles.infoChip}>
            Uncheck all filters to show any station
          </Chip>
          <EVFilterContainer cars={cars} />
          <SpeedFilterContainer speeds={speeds} setSpeeds={setSpeeds} />
          <View style={stylesheet.containerCentered}>
            {/* Button */}
            <ButtonLarge
              text="Apply filters"
              onPress={() =>
                setFilters({
                  ...filtersApplied,
                  speed: speeds,
                })
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  infoChip: {
    marginLeft: SIDE_MARGIN,
    marginRight: SIDE_MARGIN,
    marginBottom: 10,
    marginTop: 10,
  },
});
