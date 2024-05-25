import qql from "graphql-tag";

/**
 * Query to get detailed information about a station by ID
 */
export const GET_STATION_DETAILS = qql`
query station($stationId: ID!) {
  station(id: $stationId) {
    id
    name
    speed
    status
    address
    city
    parking_type
    operator {
      name
    }
    evses {
      last_updated
      connectors {
        id
        standard
        power
        power_type
      }
    }
  }
}
`;

/**
 * Query to get 40 nearest stations around the specified location
 */
export const GET_STATIONS_AROUND = qql`
query stationAround($filter: StationAroundFilter) {
  stationAround(
      filter: $filter
      size: 40
    ) {
      location {
        type
        coordinates
      }
      id
      name
      speed
      status
      address
      city 
    }
  }
`;
