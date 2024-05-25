import { List } from "react-native-paper";
import useGlobalStore from "../stores/useGlobalStore";
import stylesheet from "../styles/stylesheet";
import { formatLocaleTime } from "../utils/booking-utils";
import {
  calculateDateLastUpdated,
  fromISODateToString,
  parkingToText,
  toTitleCase,
} from "../utils/station-utils";

/**
 * A JSX component representing information about a station.
 */
export default function StationInfo() {
  const station = useGlobalStore((state) => state.currentStation); // Access station from Zustand

  // UI formatting
  const speed = `${toTitleCase(station.speed)} charging`;
  const address = `${station.address}, ${station.city}`;
  const operator = `Operated by ${station.operator.name || station.operator}`;
  const parking = `${parkingToText(station.parking_type)}`;
  const lastUpdated = `Last updated ${formatLocaleTime(
    fromISODateToString(calculateDateLastUpdated(station))
  )}`; // Also truncates seconds away from the time

  return (
    <>
      <List.Section>
        <List.Subheader>Station Details</List.Subheader>
        <List.Item
          titleStyle={stylesheet.chargerText}
          title={address}
          left={(props) => <List.Icon {...props} icon="map-marker" />}
        />
        <List.Item
          titleStyle={stylesheet.chargerText}
          title={operator}
          left={(props) => <List.Icon {...props} icon="ev-station" />}
        />
        <List.Item
          titleStyle={stylesheet.chargerText}
          title={speed}
          left={(props) => <List.Icon {...props} icon="speedometer" />}
        />
        <List.Item
          titleStyle={stylesheet.chargerText}
          title={parking}
          left={(props) => <List.Icon {...props} icon="parking" />}
        />
        <List.Item
          titleStyle={stylesheet.chargerText}
          title={lastUpdated}
          left={(props) => <List.Icon {...props} icon="update" />}
        />
      </List.Section>
    </>
  );
}
