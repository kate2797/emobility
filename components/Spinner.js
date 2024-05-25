import { ActivityIndicator } from "react-native-paper";
import stylesheet from "../styles/stylesheet";
import { TEAL } from "../constants/ui";

/**
 * A JSX component representing spinner to denote that the application is in a loading state.
 */
export default function Spinner() {
  return (
    <ActivityIndicator
      animating={true}
      color={TEAL}
      size="large"
      style={stylesheet.spinner}
    />
  );
}
