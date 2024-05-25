import {
  PARKING_TYPES,
  PLUG_TYPES,
  StationStatus,
} from "../constants/defaults";
import { GRAY, GREEN, ORANGE } from "../constants/ui";

/**
 * Applies speed filters to station markers
 */
export const filterStations = (stations, userPreferences) => {
  const { speed: preferredSpeeds } = userPreferences;
  return preferredSpeeds.length
    ? stations.filter((station) => preferredSpeeds.includes(station.speed))
    : stations;
};

/**
 * Transforms station properties to title case
 */
export const toTitleCase = (property) => {
  return property[0].toUpperCase() + property.substring(1);
};

/**
 * Calculates the overall `last_updated` for a station as the freshest date of its connectors' updates
 */
export const calculateDateLastUpdated = (station) => {
  return new Date(
    Math.max(
      ...station.evses.map((evse) => {
        return new Date(evse.last_updated).getTime();
      })
    )
  );
};

/**
 * Turns the ISO date received from the API to a human-readable string
 */
export const fromISODateToString = (ISODate) => {
  let date = new Date(ISODate).toString().split(" ");
  return `${date[1]} ${date[2]} ${date[3]}, ${date[4]}`;
};

/**
 * Transforms vehicle standard code to human-readable text
 */
export const standardToText = (standard) => {
  for (const key of PLUG_TYPES.keys()) {
    if (key.length > 1) {
      for (const item of key) {
        if (standard.includes(item)) {
          return PLUG_TYPES.get(key);
        }
      }
    } else {
      if (standard.includes(key[0])) {
        return PLUG_TYPES.get(key);
      }
    }
  }
  return standard; // A standard Chargetrip did not list
};

/**
 * Transforms a raw parking type string to human-readable text
 */
export const parkingToText = (parking) => {
  return PARKING_TYPES[parking] ? PARKING_TYPES[parking] : "No data available";
};

/**
 * Maps station status to a colour
 */
export const statusToColour = (status) => {
  const { FREE, BUSY } = StationStatus;
  return status === FREE ? GREEN : status === BUSY ? ORANGE : GRAY;
};

/**
 * Maps station status to a human-readable text
 */
export const statusToText = (status) => {
  const { FREE, BUSY } = StationStatus;
  if (status === FREE) {
    return "available";
  } else if (status === BUSY) {
    return "busy";
  } else {
    return "out of service";
  }
};

/**
 * Maps connector information to a human-readable text
 */
export const formatVehicleHelpText = (connectorArray) => {
  let formattedHelpText = "";
  for (let i = 0; i < connectorArray.length; i++) {
    if (i === connectorArray.length - 1) {
      formattedHelpText += `${standardToText(connectorArray[i])}`;
    } else {
      formattedHelpText += `${standardToText(connectorArray[i])}, `;
    }
  }
  return formattedHelpText;
};

/**
 * Formats the geocoded address returned from the Google's Places API
 */
export const getFormattedGoogleAddress = (address) => {
  if (address.length === 1 || address.split(", ").length < 3) return address;
  const splitByStreet = address.split(", ")[0];
  const splitByCity = address.split(", ")[1].split(" ")[0];
  return `${splitByStreet}, ${splitByCity}`;
};

/**
 * Checks if a station has already been bookmarked
 */
export const isAlreadyBookmarked = (stationId, bookmarks) => {
  let there = bookmarks.find((station) => station.stationId === stationId);
  return there !== undefined; // If true, it has already been bookmarked
};
