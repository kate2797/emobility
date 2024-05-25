import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // Reference: https://github.com/oblador/react-native-vector-icons

/**
 * A JSX component representing fa pre-styled icon with configurable colour and style.
 */
export default function IconSmall({ colour, name }) {
  return <MaterialCommunityIcons name={name} size={24} color={colour} />;
}
