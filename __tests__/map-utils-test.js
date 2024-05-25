import { isInsideFetchingRadius, removeFetchOverlap } from "../utils/map-utils";

describe("removeFetchOverlap tests", () => {
  it("given two arrays which contain a station with the same id, removeFetchOverlap should return an array without duplicates", () => {
    const prevState = [
      { id: "be8bc2a7-7b9f-4439-a414-4c45ba82ebc9" }, // A duplicate station
      { id: "435ec305-7b92-4345-92e5-da9956b48dc8" },
    ];
    const currentFetch = [
      { id: "be8bc2a7-7b9f-4439-a414-4c45ba82ebc9" }, // A duplicate station
      { id: "5ae5c4ad-7f6e-4d89-a6a0-640905ae3d71" },
    ];
    const fetchMerge = [
      { id: "be8bc2a7-7b9f-4439-a414-4c45ba82ebc9" }, // This station should only appear once
      { id: "435ec305-7b92-4345-92e5-da9956b48dc8" },
      { id: "5ae5c4ad-7f6e-4d89-a6a0-640905ae3d71" },
    ];
    expect(removeFetchOverlap(prevState, currentFetch)).toStrictEqual(
      fetchMerge
    );
  });
});

describe("isInsideFetchingRadius tests", () => {
  const region = {
    latitude: 51.509865,
    longitude: -0.1276,
  };
  const underFourStations = [
    {
      location: {
        coordinates: {
          latitude: 51.509877,
          longitude: -0.1234,
        },
      },
    },
  ];
  const stationsOutside = [
    {
      location: {
        coordinates: {
          latitude: 51.609857,
          longitude: -0.1834,
        },
      },
    },
    {
      location: {
        coordinates: {
          latitude: 51.609877,
          longitude: -0.1334,
        },
      },
    },
    {
      location: {
        coordinates: {
          latitude: 51.607877,
          longitude: -0.1234,
        },
      },
    },
    {
      location: {
        coordinates: {
          latitude: 51.609847,
          longitude: -0.1214,
        },
      },
    },
  ];
  it("given an array of less than 4 stations, isInsideFetchingRadius should return false", () => {
    expect(isInsideFetchingRadius(region, underFourStations)).toBeFalsy();
  });
  it("given an array of stations which geometries do not include the geometry of the region, isInsideFetchingRadius should return false", () => {
    expect(isInsideFetchingRadius(region, stationsOutside)).toBeFalsy();
  });
});
