import { ScrollView, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import stylesheet from "../../styles/stylesheet";
import useGlobalStore from "../../stores/useGlobalStore";
import MakeBooking from "../../components/MakeBooking";
import { getChargerSpeed } from "../../utils/booking-utils";

/**
 * A JSX component representing Charger Screen.
 */
export default function ChargerScreen({ route, navigation }) {
  // Global and navigation state
  const station = useGlobalStore((state) => state.currentStation);
  const user = useGlobalStore((state) => state.currentUser);
  const { externalChargerId, chargerNo } = route.params; // The ID from the API is not unique

  // Data formatting
  const chargerId = station.id + externalChargerId; // Create our unique ID for the DB
  const chargerName = `Charger No. ${chargerNo}`;
  const chargerSpeed = getChargerSpeed(station, externalChargerId);

  return (
    <>
      <Header title={`Book ${chargerName}`} navigation={navigation} />
      <SafeAreaView edges={["top"]} style={stylesheet.safeArea}>
        <ScrollView>
          <MakeBooking
            chargerId={chargerId}
            externalChargerId={externalChargerId}
            chargerName={chargerName}
            chargerSpeed={chargerSpeed}
            station={station}
            user={user}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
