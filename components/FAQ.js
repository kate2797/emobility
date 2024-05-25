import { StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";

/**
 * A JSX component representing a single FAQ instance.
 */
export default function FAQ({ title, FAQPopUp }) {
  return (
    <View style={styles.explanationContainer}>
      <Chip icon="information" onPress={FAQPopUp}>
        {title}
      </Chip>
    </View>
  );
}

const styles = StyleSheet.create({
  explanationContainer: {
    marginTop: 20,
  },
});
