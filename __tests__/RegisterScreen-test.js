import renderer from "react-test-renderer";
import RegisterScreen from "../screens/auth/RegisterScreen";

describe("RegisterScreen tests", () => {
  it("given RegisterScreen, RegisterScreen should render correctly", async () => {
    const tree = await renderer.create(<RegisterScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
