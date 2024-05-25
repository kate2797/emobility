import { View } from "react-native";
import { HelperText, List, Checkbox } from "react-native-paper";
import { useMemo } from "react";
import stylesheet from "../styles/stylesheet";
import { TEAL } from "../constants/ui";
import useCars from "../hooks/useCars";
import NothingFound from "./NothingFound";
import { formatVehicleHelpText } from "../utils/station-utils";

/**
 * A JSX component representing filtering checkboxes for EVs.
 */
export default function EVFilterContainer({ cars }) {
  const [, , , , getConnectorsById] = useCars();

  return (
    <View style={stylesheet.filterContainer}>
      <List.Subheader>EV Compatibility</List.Subheader>
      {cars.length ? (
        <View>
          <Checkbox.Item
            color={TEAL}
            label={cars[0].name}
            disabled={true}
            status={"checked"}
          />
          {/* Memoize the value, as it never changes and computing it is expensive */}
          <HelperText type="info" style={stylesheet.helperText}>
            {useMemo(
              () => formatVehicleHelpText(getConnectorsById(cars[0].carId)),
              []
            )}
          </HelperText>
        </View>
      ) : (
        <NothingFound message="You have no cars" />
      )}
    </View>
  );
}
