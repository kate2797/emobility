import renderer from "react-test-renderer";
import BookingHistoryScreen from "../screens/BookingHistoryScreen";

describe("BookingHistoryScreen tests", () => {
  beforeEach(() => {
    jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());
  }); // Due to Firestore live observer, cannot mock it in a UI test, suppress Firestore console
  it("given BookingHistoryScreen, BookingHistoryScreen should render correctly", async () => {
    const tree = await renderer.create(<BookingHistoryScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
