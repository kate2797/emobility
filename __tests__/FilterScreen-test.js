import renderer, { act } from "react-test-renderer";
import FilterScreen from "../screens/detail/FilterScreen";

describe("FilterScreen tests", () => {
  it("given FilterScreen, FilterScreen should render correctly", async () => {
    await act(async () => {
      const tree = await renderer.create(<FilterScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
