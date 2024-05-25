import renderer from "react-test-renderer";
import LandingScreen from "../screens/auth/LandingScreen";

describe("LandingScreen tests", () => {
  it("given LandingScreen, LandingScreen should render correctly", async () => {
    const tree = await renderer.create(<LandingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
