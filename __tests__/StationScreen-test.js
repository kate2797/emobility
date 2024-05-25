import renderer from "react-test-renderer";
import StationScreen from "../screens/detail/StationScreen";

describe("StationScreen tests", () => {
  it("given StationScreen, StationScreen should render correctly", async () => {
    const tree = await renderer
      .create(
        <StationScreen
          route={{
            params: { stationId: "be8bc2a7-7b9f-4439-a414-4c45ba82ebc9" }, // Mock the route parameters
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
