import { StyleSheet, View } from "react-native";
import { Card, Chip, Paragraph } from "react-native-paper";
import { FALLBACK_STATION } from "../constants/defaults";
import { ROUTES } from "../constants/routes";
import stylesheet from "../styles/stylesheet";
import ButtonLarge from "./ButtonLarge";
import { performShallowClean } from "../utils/cleaning-utils";
import {
  statusToColour,
  statusToText,
  toTitleCase,
} from "../utils/station-utils";
import { howFarAwayInMeters } from "../utils/map-utils";

/**
 * A JSX component representing a single station instance.
 */
export default function StationCard({
  station,
  userLocation,
  navigation,
  handleBookmark,
}) {
  // UI formatting
  const cleanedStation = performShallowClean(station, FALLBACK_STATION);
  const address = `${cleanedStation.address}, ${cleanedStation.city}`;
  const speed = `${toTitleCase(cleanedStation.speed)} charging`;
  const status = toTitleCase(statusToText(cleanedStation.status));
  const chipColour = statusToColour(cleanedStation.status);
  let distance = `${howFarAwayInMeters(
    station.location.coordinates,
    userLocation
  )}m away`;

  return (
    <Card
      style={stylesheet.card}
      onPress={() =>
        navigation.navigate(ROUTES.Station, {
          stationId: cleanedStation.id,
        })
      }
    >
      <Card.Title subtitle={cleanedStation.name} />
      <Card.Content>
        <Chip
          icon="lightning-bolt"
          style={stylesheet.cardItem}
          selectedColor={chipColour}
        >
          {status}
        </Chip>
        <Paragraph style={stylesheet.cardItem}>{address}</Paragraph>
        <Paragraph style={stylesheet.cardItem}>{speed}</Paragraph>
        <Paragraph style={stylesheet.cardItem}>{distance}</Paragraph>
        <View style={styles.buttonContainer}>
          <ButtonLarge text="Bookmark station" onPress={handleBookmark} />
        </View>
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
