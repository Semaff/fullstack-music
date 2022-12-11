import { ITrack } from "@typings/tracks/ITrack";
import React, { createContext, useState, FC, PropsWithChildren, useContext } from "react";
import { TrackContextInitialState } from "./TrackContextState";

const TrackContext = createContext(TrackContextInitialState);

const TrackProvider: FC<PropsWithChildren> = ({ children }) => {
  const [track, setTrack] = useState<ITrack | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [volume, setVolume] = useState(100);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentPlaylist, setCurrentPlaylist] = useState<ITrack[]>([]);

  return (
    <TrackContext.Provider
      value={{
        track,
        setTrack,
        currentPlaylist,
        setCurrentPlaylist,
        isActive,
        setIsActive,
        volume,
        setVolume,
        time,
        setTime,
        duration,
        setDuration
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackContext = () => useContext(TrackContext);
export default TrackProvider;
