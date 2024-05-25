import { DataTable } from "react-native-paper";
import RNDateTimePicker from "@react-native-community/datetimepicker"; // Reference: https://github.com/react-native-datetimepicker/datetimepicker

/**
 * A JSX component representing a time picker.
 */
export default function DateTimePicker({
  title,
  mode,
  value,
  onChange,
  disabled = false, // Default value
}) {
  const MONTH_AHEAD = new Date().getMonth() + 1;
  const maximumDate = new Date().setMonth(MONTH_AHEAD); // Not be able to book after the one month

  return (
    <>
      <DataTable.Title>{title}</DataTable.Title>
      <RNDateTimePicker
        mode={mode}
        value={value}
        onChange={(event, dateTime) => onChange(dateTime)}
        disabled={disabled}
        minimumDate={new Date()}
        maximumDate={maximumDate}
      />
    </>
  );
}
