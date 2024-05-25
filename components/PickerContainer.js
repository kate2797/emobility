import DateTimePicker from "./DateTimePicker";
import { StyleSheet, View } from "react-native";
import { SIDE_MARGIN } from "../constants/ui";

/**
 * A JSX component displaying date and time pickers.
 */
export default function PickerContainer({
  arrivalDate,
  setArrivalDate,
  arrivalDateTime,
  setArrivalDateTime,
}) {
  return (
    <View style={styles.content}>
      <DateTimePicker
        title="Desired Arrival"
        mode="date"
        value={arrivalDate}
        onChange={setArrivalDate}
      />
      <DateTimePicker
        mode="time"
        value={arrivalDateTime}
        onChange={setArrivalDateTime}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginBottom: SIDE_MARGIN,
  },
});
