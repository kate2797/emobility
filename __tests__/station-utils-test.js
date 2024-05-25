import {
  calculateDateLastUpdated,
  filterStations,
  formatVehicleHelpText,
  isAlreadyBookmarked,
  parkingToText,
  toTitleCase,
} from "../utils/station-utils";

describe("toTitleCase tests", () => {
  it("given the parameter `parking cost`, toTitleCase should return `Parking cost`", () => {
    expect(toTitleCase("parking cost")).toBe("Parking cost");
  });
});

describe("formatVehicleHelpText tests", () => {
  const connectorArray = ["CHADEMO", "IEC_62196_T2_COMBO"];
  const formattedText = "CHAdeMO, CSS";
  it("given the parameter ['CHADEMO', 'IEC_62196_T2_COMBO'], formatVehicleHelpText should return 'CHAdeMO, Type 2'", () => {
    expect(formatVehicleHelpText(connectorArray)).toBe(formattedText);
  });
});

describe("parkingToText tests", () => {
  it("given an non-formatted, but valid parking type string, parkingToText should return its formatted version", () => {
    expect(parkingToText("ON_STREET")).toBe("On street");
  });
  it("given an invalid parking type string, parkingToText should return `No data available` as a fallback", () => {
    const invalidParkingType = "PARKING_HOUSE";
    expect(parkingToText(invalidParkingType)).toBe("No data available");
  });
});

describe("calculateDateLastUpdated tests", () => {
  it("given a station with an array of EVSEs, calculateDateLastUpdated should return the time corresponding to that of the EVSE that was updated the last", () => {
    const station = {
      id: "be8bc2a7-7b9f-4439-a414-4c45ba82ebc9",
      evses: [
        {
          last_updated: "2022-04-21T00:29:18Z",
        },
        {
          last_updated: "2022-07-21T00:29:18Z", // July is the most recent date of update
        },
      ],
    };
    const july = new Date(station.evses[1].last_updated);
    expect(calculateDateLastUpdated(station)).toStrictEqual(july);
  });
});

describe("isAlreadyBookmarked tests", () => {
  const bookmarked = {
    stationId: "be8bc2a7-7b9f-4439-a414-4c45ba82ebc9",
    stationName: "BMM-CP-000504",
  };
  const notYetBookmarked = {
    stationId: "435ec305-7b92-4345-92e5-da9956b48dc8",
    stationName: "Station Crowne Plaza Glasgow",
  };
  const bookmarks = [bookmarked];
  it("given station that has already been bookmarked, isAlreadyBookmarked should return true", () => {
    expect(isAlreadyBookmarked(bookmarked.stationId, bookmarks)).toBeTruthy();
  });
  it("given station that has yet not been bookmarked, isAlreadyBookmarked should return false", () => {
    expect(
      isAlreadyBookmarked(notYetBookmarked.stationId, bookmarks)
    ).toBeFalsy();
  });
});

describe("filterStations tests", () => {
  const mockStations = [
    {
      id: "be8bc2a7-7b9f-4439-a414-4c45ba82ebc9",
      speed: "slow",
    },
    {
      id: "435ec305-7b92-4345-92e5-da9956b48dc8",
      speed: "turbo",
    },
    {
      id: "5ae5c4ad-7f6e-4d89-a6a0-640905ae3d71",
      speed: "turbo",
    },
    {
      id: "01bc47c0-e75b-412a-8615-7cd917628d68",
      speed: "fast",
    },
  ];
  const slowStations = [
    {
      id: "be8bc2a7-7b9f-4439-a414-4c45ba82ebc9",
      speed: "slow",
    },
  ];
  const fastAndTurboStations = [
    {
      id: "435ec305-7b92-4345-92e5-da9956b48dc8",
      speed: "turbo",
    },
    {
      id: "5ae5c4ad-7f6e-4d89-a6a0-640905ae3d71",
      speed: "turbo",
    },
    {
      id: "01bc47c0-e75b-412a-8615-7cd917628d68",
      speed: "fast",
    },
  ];
  it("given a preference for slow, filterStations should only return slow stations", () => {
    expect(filterStations(mockStations, { speed: ["slow"] })).toStrictEqual(
      slowStations
    );
  });
  it("given a preference for fast and turbo, filterStations should only return fast and turbo stations", () => {
    expect(
      filterStations(mockStations, { speed: ["fast", "turbo"] })
    ).toStrictEqual(fastAndTurboStations);
  });
});
