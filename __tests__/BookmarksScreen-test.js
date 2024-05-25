import renderer from "react-test-renderer";
import BookmarksScreen from "../screens/detail/BookmarksScreen";

describe("BookmarksScreen tests", () => {
  it("given BookmarksScreen, BookmarksScreen should render correctly", async () => {
    const tree = await renderer.create(<BookmarksScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
