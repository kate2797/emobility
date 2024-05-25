import renderer from "react-test-renderer";
import AccountScreen from "../screens/AccountScreen";

describe("AccountScreen tests", () => {
  it("given AccountScreen, AccountScreen should render correctly", async () => {
    const tree = await renderer.create(<AccountScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
