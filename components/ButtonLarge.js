import { Button } from "react-native-paper";
import { TEAL } from "../constants/ui";
import stylesheet from "../styles/stylesheet";

/**
 * A JSX component representing a large button, with pre-defined styling but configurable text.
 */
export default function ButtonLarge({ text, onPress }) {
  return (
    <Button
      mode="outlined"
      onPress={onPress}
      color={TEAL}
      style={stylesheet.button}
      contentStyle={stylesheet.buttonContentStyle}
    >
      {text}
    </Button>
  );
}
