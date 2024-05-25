import { Alert } from "react-native";

/**
 * Creates a modal window with a single option
 */
export const createModalOneOption = (title, message) => {
  Alert.alert(title, message, [{ text: "OK" }]);
};
