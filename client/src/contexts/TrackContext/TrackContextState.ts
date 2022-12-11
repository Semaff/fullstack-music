import { Dispatch, SetStateAction } from "react";
import { ITrack } from "@typings/tracks/ITrack";

export interface TrackState {
  track: ITrack | null;
  currentPlaylist: ITrack[];
  isActive: boolean;
  volume: number;
  time: number;
  duration: number;
  setTrack: Dispatch<SetStateAction<ITrack | null>>;
  setCurrentPlaylist: Dispatch<SetStateAction<ITrack[]>>;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<number>>;
  setTime: Dispatch<SetStateAction<number>>;
  setDuration: Dispatch<SetStateAction<number>>;
}

export const TrackContextInitialState: TrackState = {
  track: null,
  currentPlaylist: [],
  isActive: false,
  volume: 100,
  time: 0,
  duration: 0,
  setTrack: () => ({}),
  setCurrentPlaylist: () => ({}),
  setIsActive: () => ({}),
  setVolume: () => ({}),
  setTime: () => ({}),
  setDuration: () => ({})
};
