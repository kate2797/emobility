import { Card, Chip } from "react-native-paper";
import { Platform, StyleSheet, View } from "react-native";
import stylesheet from "../styles/stylesheet";
import { RED } from "../constants/ui";
import ButtonLarge from "./ButtonLarge";
import {
  formatLocaleTime,
  timestampToLocaleString,
} from "../utils/booking-utils";

/**
 * A JSX component representing a single booking instance.
 */
export default function BookingHistoryCard({
  arrivalDateTime,
  exitDateTime,
  externalMetadata,
  handleCancellation,
}) {
  const [arrivalDate, arrivalTime] = timestampToLocaleString(arrivalDateTime); // Formatting for the UI
  const [, exitTime] = timestampToLocaleString(exitDateTime);
  const formattedDateTime =
    Platform.OS === "android"
      ? arrivalDate
      : `${arrivalDate}, ${formatLocaleTime(arrivalTime)} to ${formatLocaleTime(
          exitTime
        )}`; // Render the appropriate format depending on the platform

  return (
    <Card style={stylesheet.card}>
      <Card.Title subtitle={`${externalMetadata.chargerName}`} />
      <Card.Content>
        <Chip icon="ev-station" style={stylesheet.cardItem}>
          {externalMetadata.stationName}
        </Chip>
        <Chip icon="map-marker" style={stylesheet.cardItem}>
          {externalMetadata.stationAddress}
        </Chip>
        <Chip icon="clock" style={stylesheet.cardItem} selectedColor={RED}>
          {formattedDateTime}
        </Chip>
        {handleCancellation && (
          <View style={styles.buttonContainer}>
            <ButtonLarge text="Cancel booking" onPress={handleCancellation} />
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
});
