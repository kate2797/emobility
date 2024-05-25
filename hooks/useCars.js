import useCarListAll from "./useCarListAll";
import { removeMakeDuplicates } from "../utils/cleaning-utils";

/**
 * A custom hook with logic to manipulate EV data.
 */
export default function useCars() {
  const [carListAll] = useCarListAll(); // Get all car data

  /**
   * Returns a list of unique car makes to be displayed in the UI
   */
  const getMakeList = () => {
    const uniqueCarList = removeMakeDuplicates(carListAll);
    return uniqueCarList.map((car) => {
      return {
        label: car.naming.make,
        value: car.naming.make,
      };
    });
  };

  /**
   * Returns all its models to be displayed in the UI given a make
   */
  const getModelListForMake = (make) => {
    return carListAll
      .filter((car) => car.naming.make === make)
      .map((car) => {
        return {
          label: car.naming.model, // <DropBox/> component expects this format
          value: car.naming.model,
        };
      });
  };

  /**
   * Returns car id and connectors given a car make and model
   */
  const getCarDetails = (make, model) => {
    let searchedCar = { id: "", connectors: [] };
    if (make && model) {
      carListAll.forEach((car) => {
        if (car.naming.make === make && car.naming.model === model) {
          searchedCar = {
            id: car.id,
            connectors: getConnectors(car),
          };
        }
      });
    }
    return searchedCar;
  };

  /**
   * Retrieves all supported connector standards of a given EV
   */
  const getConnectors = (car) => {
    return car.connectors.map((connector) => {
      return connector.standard;
    });
  };

  /**
   * Retrieves all supported connector standards of a given EV by ID
   */
  const getConnectorsById = (id) => {
    let searchedCar = null;
    carListAll.forEach((car) => {
      if (car.id === id) {
        searchedCar = {
          connectors: getConnectors(car),
        };
      }
    });
    return searchedCar.connectors;
  };

  /**
   * Retrieves battery information of a given EV by ID
   */
  const getBatteryInfoById = (id) => {
    let batteryInfo = null;
    carListAll.forEach((car) => {
      if (car.id === id) {
        batteryInfo = car.battery;
      }
    });
    return batteryInfo;
  };

  return [
    getMakeList,
    getModelListForMake,
    getCarDetails,
    getBatteryInfoById,
    getConnectorsById,
  ];
}
