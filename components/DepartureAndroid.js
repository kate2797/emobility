import { DataTable } from "react-native-paper";
import { Text } from "react-native";

/**
 * A JSX component displaying suggested departure for Android.
 */
export default function DepartureAndroid({ exitDateTime }) {
  return (
    <>
      <DataTable.Title>Suggested Departure</DataTable.Title>
      <Text>{exitDateTime.toLocaleString()}</Text>
    </>
  );
}
