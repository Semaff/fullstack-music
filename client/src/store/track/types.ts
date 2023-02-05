import { ITrack } from "modules/Track";

export interface TrackState {
  track: ITrack | null;
  currentPlaylist: ITrack[] | null;
  isActive: boolean;
  volume: number;
  time: number;
  duration: number;
}

export interface TrackActions {
  setTrack: (track: ITrack | null) => void;
  setCurrentPlaylist: (playlist: ITrack[] | null) => void;
  setIsActive: (isActive: boolean) => void;
  setVolume: (volume: number) => void;
  setTime: (time: number) => void;
  setDuration: (duration: number) => void;
}
