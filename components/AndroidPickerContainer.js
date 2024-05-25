import { Button, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { DataTable } from "react-native-paper";
import { SIDE_MARGIN, TEAL } from "../constants/ui";
import DateTimePicker from "./DateTimePicker";

/**
 * A JSX component displaying date and time pickers for Android.
 */
export default function AndroidPickerContainer({
  arrivalDate,
  setArrivalDate,
  arrivalDateTime,
  setArrivalDateTime,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Event handlers
  const showDateModal = () => {
    setShowDatePicker(true);
  };

  const showTimeModal = () => {
    setShowTimePicker(true);
  };

  const onArrivalDateSelection = (date) => {
    setArrivalDate(new Date(date.toISOString()));
    setShowDatePicker(false);
  };

  const onArrivalTimeSelection = (time) => {
    setArrivalDateTime(new Date(time.toISOString()));
    setShowTimePicker(false);
  };

  return (
    <View style={styles.content}>
      <DataTable.Title>Desired Arrival</DataTable.Title>
      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Select Date" onPress={showDateModal} color={TEAL} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Select Time" onPress={showTimeModal} color={TEAL} />
      </View>
      <Text>{arrivalDateTime.toLocaleString()}</Text>
      {/* Pickers */}
      {showDatePicker && (
        <DateTimePicker
          title="Desired Arrival"
          mode="date"
          value={arrivalDate}
          onChange={(date) => onArrivalDateSelection(date)}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={arrivalDateTime}
          onChange={(time) => onArrivalTimeSelection(time)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginBottom: SIDE_MARGIN,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});
