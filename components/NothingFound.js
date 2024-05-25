import { StyleSheet, Text, View } from "react-native";

/**
 * A JSX component displaying a `nothing found` message when no data is available.
 */
export default function NothingFound({ message }) {
  return (
    <View style={styles.errorContainer}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: "center",
    margin: 16,
  },
});
