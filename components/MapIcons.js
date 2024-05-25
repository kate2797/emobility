import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { GRAY } from "../constants/ui";
import { ROUTES } from "../constants/routes";

/**
 * A JSX component representing map icons.
 */
export default function MapIcons({
  navigation,
  geolocation,
  handlePlaceSearch,
  setUserMapRegion,
}) {
  // Event handlers
  const handleUserMove = () => {
    handlePlaceSearch(geolocation.latitude, geolocation.longitude);
    setUserMapRegion(geolocation); // Update the state in the parent component
  };

  return (
    <>
      <FAB
        style={styles.fabTarget}
        color={GRAY}
        icon="target"
        size="small"
        onPress={() => handleUserMove()}
      />
      <FAB
        style={styles.fabFilter}
        color={GRAY}
        icon="filter"
        size="small"
        onPress={() => navigation.navigate(ROUTES.Filter)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fabTarget: {
    backgroundColor: "white",
    position: "absolute",
    right: 0,
    bottom: 40,
    margin: 15,
  },
  fabFilter: {
    backgroundColor: "white",
    position: "absolute",
    right: 0,
    bottom: 110,
    margin: 15,
  },
});
