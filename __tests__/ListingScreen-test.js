import renderer, { act } from "react-test-renderer";
import ListingScreen from "../screens/ListingScreen";

describe("ListingScreen tests", () => {
  beforeEach(() => {
    jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());
  }); // Due to Firestore live observer, cannot mock it in a UI test, suppress Firestore console
  it("given ListingScreen, ListingScreen should render correctly", async () => {
    await act(async () => {
      const tree = await renderer.create(<ListingScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
