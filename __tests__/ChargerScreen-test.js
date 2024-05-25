import renderer from "react-test-renderer";
import useGlobalStore from "../stores/useGlobalStore";
import { FALLBACK_STATION } from "../constants/defaults";

describe("ChargerScreen tests", () => {
  const initialStoreState = useGlobalStore.getState(); // Create a mock Zustand store
  beforeEach(() => {
    useGlobalStore.setState(initialStoreState, true);
  });
  useGlobalStore.setState({
    currentStation: initialStoreState.setCurrentStation(FALLBACK_STATION), // Mock a station
  });
  it("given ChargerScreen, ChargerScreen should render correctly", async () => {
    const tree = await renderer;
    expect(tree).toMatchSnapshot();
  });
});
