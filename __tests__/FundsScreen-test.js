import renderer from "react-test-renderer";
import FundsScreen from "../screens/detail/FundsScreen";

describe("FundsScreen tests", () => {
  it("given FundsScreen, FundsScreen should render correctly", async () => {
    const tree = await renderer.create(<FundsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
