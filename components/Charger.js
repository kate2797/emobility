import { Text, View, StyleSheet } from "react-native";
import { SIDE_MARGIN } from "../constants/ui";
import { ROUTES } from "../constants/routes";
import stylesheet from "../styles/stylesheet";
import useGlobalStore from "../stores/useGlobalStore";
import { StationStatus } from "../constants/defaults";
import IconSmall from "./IconSmall";
import ButtonSmall from "./ButtonSmall";
import { standardToText, statusToColour } from "../utils/station-utils";

/**
 * A JSX component representing a charger with all its information such as speed, standard.
 */
export default function Charger({ charger, numbering, navigation }) {
  const station = useGlobalStore((state) => state.currentStation);

  // UI formatting
  const standard = standardToText(charger.standard);
  const isUnserviceable =
    station.status === StationStatus.UNKNOWN ||
    station.status === StationStatus.ERROR; // Disable booking if the station is unserviceable
  const colour = statusToColour(station.status);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={stylesheet.chargerText}>No. {numbering}</Text>
      </View>
      <View style={styles.item}>
        <IconSmall colour={colour} name="lightning-bolt-circle" />
      </View>
      <View style={styles.item}>
        <Text style={stylesheet.chargerText}>{standard}</Text>
      </View>
      <View style={styles.item}>
        <Text style={stylesheet.chargerText}>{charger.power}kW</Text>
      </View>
      <View style={styles.item}>
        <ButtonSmall
          text="Book"
          disabled={isUnserviceable}
          onPress={() =>
            navigation.navigate(ROUTES.Charger, {
              externalChargerId: charger.id,
              chargerNo: numbering,
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: SIDE_MARGIN,
    marginRight: SIDE_MARGIN,
    marginTop: 10,
    marginBottom: 10,
  },
  item: {
    marginBottom: 16,
  },
});
