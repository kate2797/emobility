/**
 * A module storing constants related to mapping features.
 */
export const COORD_DELTA = 0.037;

export const LONDON = {
  latitude: 51.509865,
  longitude: -0.1276,
  latitudeDelta: COORD_DELTA,
  longitudeDelta: COORD_DELTA,
};

export const DEFAULT_COORDS = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: COORD_DELTA,
  longitudeDelta: COORD_DELTA,
};

export const GEOCODING_BASE_URL =
  "https://maps.googleapis.com/maps/api/geocode/json?address=";
