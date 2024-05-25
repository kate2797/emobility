import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_PREFERENCES } from "../constants/defaults";

const actions = (set, get) => ({
  setFilters: (filters) =>
    set({
      filtersApplied: filters,
    }),
});

const usePersistentStore = create(
  persist(
    (set, get) => ({
      filtersApplied: DEFAULT_PREFERENCES,
      ...actions(set, get),
    }),
    {
      name: "store-filters",
      getStorage: () => AsyncStorage, // Connect to AsyncStorage
    }
  )
);

export default usePersistentStore;
