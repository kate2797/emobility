import { StyleSheet, View } from "react-native";
import { Chip, List } from "react-native-paper";
import { SIDE_MARGIN } from "../constants/ui";
import useGlobalStore from "../stores/useGlobalStore";
import { statusToText } from "../utils/station-utils";
import useCurrentCar from "../hooks/useCurrentCar";
import useCars from "../hooks/useCars";
import Charger from "./Charger";

/**
 * A JSX component displaying a list of charger instances.
 */
export default function ChargerList({ navigation }) {
  // Global state
  const station = useGlobalStore((state) => state.currentStation);
  const user = useGlobalStore((state) => state.currentUser);

  // Hooks
  const [car] = useCurrentCar(user?.uid);
  const [, , , , getConnectorsById] = useCars();

  // UI formatting
  let chargerNumbering = 1; // Number the chargers
  const message = `All chargers are currently ${statusToText(station.status)}`; // Individual charger status not provided in most cases

  // Event handlers
  const handleGetOnlyCompatibleConnectors = (connectors) => {
    const userConnectors = getConnectorsById(car.carId); // Return only compatible connectors
    return connectors.filter((connector) =>
      userConnectors.includes(connector.standard)
    );
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Charger Details</List.Subheader>
      </List.Section>
      <Chip icon="information" style={styles.infoMessage}>
        {message}
      </Chip>
      {/* JSX elements for chargers */}
      {car &&
        station.evses.map((evse) => {
          return handleGetOnlyCompatibleConnectors(evse.connectors).map(
            (connector) => {
              return (
                <Charger
                  key={connector.id}
                  charger={connector}
                  numbering={chargerNumbering++}
                  navigation={navigation}
                />
              );
            }
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  infoMessage: {
    marginLeft: SIDE_MARGIN,
    marginRight: SIDE_MARGIN,
    marginBottom: 10,
  },
});
