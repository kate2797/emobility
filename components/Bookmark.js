import { StyleSheet, Text, View } from "react-native";
import stylesheet from "../styles/stylesheet";
import { GRAY, SIDE_MARGIN } from "../constants/ui";
import { ROUTES } from "../constants/routes";
import ButtonSmall from "./ButtonSmall";
import IconSmall from "./IconSmall";

/**
 * A JSX component representing a single station bookmark instance.
 */
export default function Bookmark({ stationId, stationName, navigation }) {
  return (
    <>
      <View style={styles.container}>
        <IconSmall name="ev-station" colour={GRAY} />
        <View style={styles.item}>
          <Text style={stylesheet.chargerText}>{stationName}</Text>
        </View>
        <View style={styles.item}>
          <ButtonSmall
            text="View"
            disabled={false}
            onPress={() =>
              navigation.navigate(ROUTES.Station, {
                stationId,
              })
            }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: SIDE_MARGIN,
    marginRight: SIDE_MARGIN,
    marginTop: 10,
    marginBottom: 26,
  },
});
