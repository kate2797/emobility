/**
 * Handles missing data in a station object by providing default values
 */
export const handleNullProperties = (fetchedStation, fallback) => {
  return {
    ...fetchedStation,
    name: fetchedStation.name || fallback.name,
    speed: fetchedStation.speed || fallback.speed,
    status: fetchedStation.status || fallback.status,
    address: fetchedStation.address || fallback.address,
    city: fetchedStation.city || fallback.city,
    parking_type: fetchedStation.parking_type || fallback.parking_type,
    operator: handleNullOperator(fetchedStation.operator, fallback),
    evses: handleNullEvses(fetchedStation.evses, fallback), // Array of EVSEs, each of which can have multiple connectors
  };
};

/**
 * Handles missing data in the operator field
 */
const handleNullOperator = (operatorObject, fallback) => {
  if (!operatorObject) {
    return fallback.operator; // The entire object is missing
  } else {
    return operatorObject.name || fallback.operator.name; // Only the name is missing
  }
};

/**
 * Handles missing data in the EVSES field
 */
const handleNullEvses = (evsesObject, fallback) => {
  if (!evsesObject) {
    return fallback.evses;
  } else {
    return evsesObject.map((evse) => {
      return {
        ...evse,
        last_updated: evse.last_updated || fallback.evses[0].last_updated,
        connectors: handleNullConnectors(evse.connectors, fallback),
      };
    });
  }
};

/**
 * Handles missing data in the connector field
 */
const handleNullConnectors = (connectorsObject, fallback) => {
  if (!connectorsObject) {
    return fallback.evses[0].connectors; // If no object, full replacement
  } else {
    return connectorsObject.map((connector) => {
      return {
        ...connector,
        standard:
          connector.standard || fallback.evses[0].connectors[0].standard,
        power: connector.power || fallback.evses[0].connectors[0].power,
        power_type:
          connector.power_type || fallback.evses[0].connectors[0].power_type,
      };
    });
  }
};

/**
 * Handles missing data only in the top-level station fields using conditional logic, thus in O(1) time
 */
export const performShallowClean = (station, fallback) => {
  return {
    ...station,
    name: station.name || fallback.name,
    speed: station.speed || fallback.speed,
    status: station.status || fallback.status,
    address: station.address || fallback.address,
    city: station.city || fallback.city,
    parking_type: station.parking_type || fallback.parking_type,
    operator: handleNullOperator(station.operator, fallback),
    evses: station.evses || fallback.evses,
  };
};

/**
 * Removes duplicates from the make list used in <Dropdown />
 */
export const removeMakeDuplicates = (carList) => {
  const uniqueMakes = [];
  const uniqueCarList = [];
  carList.forEach((car) => {
    if (!uniqueMakes.includes(car.naming.make)) {
      uniqueMakes.push(car.naming.make);
      uniqueCarList.push(car);
    }
  });
  return uniqueCarList;
};
