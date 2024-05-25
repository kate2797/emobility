import { View } from "react-native";
import { Appbar } from "react-native-paper";
import { TEAL } from "../constants/ui";

/**
 * A JSX component representing a header with a back arrow (if the navigation object is passed as a prop) or without.
 */
export default function Header({ title, navigation }) {
  return (
    <View style={{ marginBottom: 40 }}>
      <Appbar.Header style={{ backgroundColor: TEAL }}>
        {navigation && (
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        )}
        <Appbar.Content title={title} />
      </Appbar.Header>
    </View>
  );
}
