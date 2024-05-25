import { View } from "react-native";
import { HelperText, List, Checkbox } from "react-native-paper";
import stylesheet from "../styles/stylesheet";
import { TEAL } from "../constants/ui";

/**
 * A JSX component representing filtering checkboxes for station speeds.
 */
export default function SpeedFilterContainer({ speeds, setSpeeds }) {
  // Local helpers
  const obtainStatus = (value) => {
    return speeds.includes(value) ? "checked" : "unchecked"; // Determine checkbox status
  };

  // Event handlers
  const handleToggleFilter = (value) => {
    if (speeds.includes(value)) {
      setSpeeds((prevState) => {
        return [...prevState.filter((filter) => filter !== value)];
      }); // Turn off
    } else {
      setSpeeds((prevState) => {
        return [...prevState, value]; // Turn on
      });
    }
  };

  return (
    <View style={stylesheet.filterContainer}>
      <List.Subheader>Station Speed</List.Subheader>
      <Checkbox.Item
        color={TEAL}
        label="Slow (1 to 43 kW)"
        status={obtainStatus("slow")}
        onPress={() => handleToggleFilter("slow")}
      />
      <HelperText type="info" style={stylesheet.helperText}>
        Approx. 7 hour charge
      </HelperText>
      <Checkbox.Item
        color={TEAL}
        label="Fast (43 to 100 kW)"
        status={obtainStatus("fast")}
        onPress={() => handleToggleFilter("fast")}
      />
      <HelperText type="info" style={stylesheet.helperText}>
        Approx. 60 min charge
      </HelperText>
      <Checkbox.Item
        color={TEAL}
        label="Turbo (100 to 350 kW)"
        status={obtainStatus("turbo")}
        onPress={() => handleToggleFilter("turbo")}
      />
      <HelperText type="info" style={stylesheet.helperText}>
        Approx. 30 min charge
      </HelperText>
    </View>
  );
}
