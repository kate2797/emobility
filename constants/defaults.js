/**
 * A module storing constants for default and fallback values used in the application.
 */
export const StationStatus = {
  FREE: "free",
  BUSY: "busy",
  UNKNOWN: "unknown",
  ERROR: "error",
};

export const BookingStatus = {
  ISSUED: "issued",
  CANCELLED: "cancelled",
};

export const PLUG_TYPES = new Map([
  [["CHADEMO"], "CHAdeMO"],
  [["CHAOJI"], "ChaoJi"],
  [["TESLA"], "Tesla"],
  [["DOMESTIC", "60309", "NEMA", "62196_T1", "62196 Type 1"], "Type 1"],
  [["Combo Type", "62196_T2_COMBO"], "CSS"],
  [["62196_T2", "GB_T"], "Type 2"],
  [["PANTOGRAPH"], "Type B"],
]);

export const PARKING_TYPES = {
  ON_DRIVEWAY: "On driveway",
  ALONG_MOTORWAY: "Along motorway",
  ON_STREET: "On street",
  UNDERGROUND_GARAGE: "Underground garage",
  PARKING_GARAGE: "Parking garage",
  PARKING_LOT: "Parking lot",
};

export const DEFAULT_PREFERENCES = {
  connectors: [],
  speed: ["slow", "fast", "turbo"],
};

export const FALLBACK_CAR_ID = "5f043dcabc262f1627fc0345";

export const FALLBACK_STATION = {
  name: "Currie Motors",
  speed: "turbo",
  status: "free",
  address: "100 Tachbrook Street",
  city: "London",
  parking_type: "ON_STREET",
  operator: { name: "Ubitricity" },
  evses: [
    {
      last_updated: "2022-07-21T00:29:18Z",
      connectors: [
        {
          id: "118496-1",
          standard: "IEC_62196_T2_COMBO",
          power: 150,
          power_type: "DC",
        },
      ],
    },
  ],
};

export const DEFAULT_FEE = 1.0;

export const CANCELLATION_FEE = 2.0;

export const DEFAULT_STATUS = BookingStatus.ISSUED;

export const TIME_BUFFER = 10;
