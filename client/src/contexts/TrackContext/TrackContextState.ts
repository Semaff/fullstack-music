import { Dispatch, SetStateAction } from "react";
import { ITrack } from "@typings/tracks/ITrack";

export interface TrackContextValues {
  track: ITrack | null;
  currentPlaylist: ITrack[];
  isActive: boolean;
  volume: number;
  time: number;
  duration: number;
}

export interface TrackContextSetters {
  setTrack: Dispatch<SetStateAction<ITrack | null>>;
  setCurrentPlaylist: Dispatch<SetStateAction<ITrack[]>>;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<number>>;
  setTime: Dispatch<SetStateAction<number>>;
  setDuration: Dispatch<SetStateAction<number>>;
}

export type TrackContextState = TrackContextValues & TrackContextSetters;

export const TrackContextInitialValues: TrackContextValues = {
  track: null,
  currentPlaylist: [],
  isActive: false,
  volume: 100,
  time: 0,
  duration: 0
};

export const TrackContextInitialSetters: TrackContextSetters = {
  setTrack: () => ({}),
  setCurrentPlaylist: () => ({}),
  setIsActive: () => ({}),
  setVolume: () => ({}),
  setTime: () => ({}),
  setDuration: () => ({})
};

export const TrackContextInitialState: TrackContextState = {
  ...TrackContextInitialValues,
  ...TrackContextInitialSetters
};
