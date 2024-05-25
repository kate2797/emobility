import * as turf from "@turf/turf"; // Reference: https://www.npmjs.com/package/@turf

/**
 * Computes the distance in meters between two geographical points using the Haversine formula to account for global curvature
 * Uses Turf.js for the distance computation. Reference: https://www.npmjs.com/package/turf-distance
 */
export const howFarAwayInMeters = (stationCoords, userCoords) => {
  let station = turf.point([stationCoords[0], stationCoords[1]]);
  let driver = turf.point([userCoords.longitude, userCoords.latitude]);
  return Math.round(turf.distance(station, driver, { units: "meters" }));
};

/**
 * Computes if the user has stepped outside the of the polygon of already fetched stations
 * Uses Turf.js for the polygon computation. Reference: https://www.npmjs.com/package/@turf/boolean-point-in-polygon
 */
export const isInsideFetchingRadius = (region, fetchedStations) => {
  if (fetchedStations.length < 4) return false; // Need at least 4 geopoints to calculate a polygon
  const regionCoords = turf.point([region.longitude, region.latitude]); // Turn region into a GeoJSON object
  const firstStationCoords = fetchedStations[0].location.coordinates;
  const stationCoords = fetchedStations.map((station) => {
    return station.location.coordinates; // Turn stations into arrays of coordinates
  });
  stationCoords.push(firstStationCoords); // First and last station must match to close-off the polygon, add `first` to the array
  return turf.booleanPointInPolygon(
    regionCoords,
    turf.polygon([stationCoords])
  );
};

/**
 * Removes any duplicates from previous fetches, needed as we always fetch for a radius and radii can overlap
 */
export const removeFetchOverlap = (prevState, currentFetch) => {
  let updatedState = [...prevState];
  const prevStateIds = prevState.map((station) => station.id);
  currentFetch.forEach((station) => {
    if (!prevStateIds.includes(station.id)) {
      updatedState.push(station);
    }
  });
  return updatedState;
};

/**
 * Computes the value of new location state
 */
export const computeWhereToUpdateTo = (userCoords, region, stations) => {
  if (!isInsideFetchingRadius(region, stations)) {
    return region; // User stepped outside the fetching radius, return new location
  } else {
    return userCoords;
  }
};
