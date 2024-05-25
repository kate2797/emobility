import { Text } from "react-native";
import { DataTable } from "react-native-paper";
import { TEAL } from "../constants/ui";
import { Slider } from "@miblanchard/react-native-slider"; // Reference: https://github.com/miblanchard/react-native-slider

/**
 * A JSX component representing a charge slider.
 */
export default function ChargeSlider({
  sliderTitle,
  value,
  onSlidingComplete,
  valueLabel,
}) {
  return (
    <>
      <DataTable.Title>{sliderTitle}</DataTable.Title>
      <Slider
        value={value}
        maximumValue={100}
        step={1}
        onValueChange={(value) => onSlidingComplete(value[0])}
        minimumTrackTintColor={TEAL}
        thumbTintColor={TEAL}
      />
      <Text>{valueLabel}%</Text>
    </>
  );
}
