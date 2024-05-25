import { Button } from "react-native-paper";
import { TEAL } from "../constants/ui";
import stylesheet from "../styles/stylesheet";

/**
 * A JSX component representing a small button, with pre-defined styling but configurable button text.
 */
export default function ButtonSmall({ text, disabled = false, onPress }) {
  return (
    <Button
      mode="outlined"
      color={TEAL}
      compact={true}
      disabled={disabled}
      style={stylesheet.buttonSmall}
      contentStyle={stylesheet.buttonContentStyle}
      onPress={onPress}
    >
      {text}
    </Button>
  );
}
