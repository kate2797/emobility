import { Divider } from "react-native-paper";
import stylesheet from "../styles/stylesheet";
import ChargeSlider from "./ChargeSlider";

/**
 * A JSX component displaying charge time sliders.
 */
export default function SliderContainer({
  initialCharge,
  setInitialCharge,
  desiredCharge,
  setDesiredCharge,
}) {
  return (
    <>
      <ChargeSlider
        sliderTitle="Current State of Charge"
        value={initialCharge}
        onSlidingComplete={setInitialCharge}
        valueLabel={initialCharge}
      />
      <Divider style={stylesheet.divider} />
      <ChargeSlider
        sliderTitle="Desired State of Charge"
        value={desiredCharge}
        onSlidingComplete={setDesiredCharge}
        valueLabel={desiredCharge}
      />
      <Divider style={stylesheet.divider} />
    </>
  );
}
