import create from "zustand";
import { DEFAULT_COORDS } from "../constants/map";

const actions = (set) => ({
  setCurrentUser: (user) => set({ currentUser: user }),
  setUserMapRegion: (position) => set({ userMapRegion: position }),
  setCurrentStation: (station) => set({ currentStation: station }),
});

const useGlobalStore = create((set) => ({
  currentUser: null,
  userMapRegion: DEFAULT_COORDS,
  currentStation: null,
  ...actions(set),
}));

export default useGlobalStore;
