import renderer from "react-test-renderer";
import MapScreen from "../screens/MapScreen";

describe("MapScreen tests", () => {
  it("given MapScreen, MapScreen should render correctly", async () => {
    const tree = await renderer.create(<MapScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
