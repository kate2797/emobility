import { Text } from "react-native";
import { SvgUri } from "react-native-svg"; // Reference: https://github.com/react-native-svg/react-native-svg
import { LOGO } from "../constants/ui";

/**
 * A JSX component representing the application's logo.
 */
export default function Logo({ subtitle }) {
  return (
    <>
      <SvgUri uri={LOGO} width="80%" height="50%" />
      <Text style={{ marginBottom: 20, marginTop: 20 }}>{subtitle}</Text>
    </>
  );
}
