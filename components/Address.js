import { List } from "react-native-paper";
import stylesheet from "../styles/stylesheet";

/**
 * A JSX component representing user's physical address.
 */
export default function Address({ address }) {
  return (
    <List.Item
      title={address}
      titleStyle={stylesheet.chargerText}
      left={(props) => (
        <List.Icon
          {...props}
          icon="human-handsdown"
          titleStyle={stylesheet.chargerText}
        />
      )}
    />
  );
}
