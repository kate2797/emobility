import renderer from "react-test-renderer";
import LoginScreen from "../screens/auth/LoginScreen";

describe("LoginScreen tests", () => {
  it("given LoginScreen, LoginScreen should render correctly", async () => {
    const tree = await renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
