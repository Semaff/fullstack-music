import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { TrackActions, TrackState } from "./types";

const useTrackStore = create<TrackState & TrackActions>()(
  immer(
    devtools((set) => ({
      track: null,
      currentPlaylist: null,
      isActive: false,
      volume: 50,
      time: 0,
      duration: 0,
      setTrack: (track) => set(() => ({ track })),
      setCurrentPlaylist: (playlist) => set(() => ({ playlist })),
      setIsActive: (isActive) => set(() => ({ isActive })),
      setVolume: (volume) => set(() => ({ volume })),
      setTime: (time) => set(() => ({ time })),
      setDuration: (duration) => set(() => ({ duration }))
    }))
  )
);

export default useTrackStore;
