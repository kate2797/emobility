import { StyleSheet, View } from "react-native";
import FAQ from "./FAQ";
import { createModalOneOption } from "../utils/generic-utils";
import {
  FAQ_CHARGE_TIME,
  FAQ_DEPARTURE,
  FAQ_FEES,
  FAQ_LATE,
  FAQ_LENGTH,
  FAQ_MIN_CHARGE,
} from "../constants/messages";
import { SIDE_MARGIN } from "../constants/ui";

/**
 * A JSX component representing a container holding FAQs.
 */
export default function FAQContainer() {
  return (
    <View style={styles.content}>
      <FAQ
        title="Is there a price for this service?"
        FAQPopUp={() => createModalOneOption("Notice", FAQ_FEES)}
      />
      <FAQ
        title="How is my charging slot duration calculated?"
        FAQPopUp={() => createModalOneOption("Notice", FAQ_CHARGE_TIME)}
      />
      <FAQ
        title={`What does "Suggested Departure" mean?`}
        FAQPopUp={() => createModalOneOption("Notice", FAQ_DEPARTURE)}
      />
      <FAQ
        title="Do you offer slots of any length?"
        FAQPopUp={() => createModalOneOption("Notice", FAQ_LENGTH)}
      />
      <FAQ
        title="Can I book a slot for less than 20% of charge?"
        FAQPopUp={() => createModalOneOption("Notice", FAQ_MIN_CHARGE)}
      />
      <FAQ
        title="Could I be a bit late?"
        FAQPopUp={() => createModalOneOption("Notice", FAQ_LATE)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginLeft: SIDE_MARGIN,
    marginRight: SIDE_MARGIN,
    marginBottom: 10,
  },
});
