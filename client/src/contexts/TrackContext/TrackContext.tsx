import { ITrack } from "@typings/tracks/ITrack";
import React, { createContext, useState, FC, PropsWithChildren, useContext } from "react";
import { TrackContextInitialState, TrackContextValues } from "./TrackContextState";

export const TrackContext = createContext(TrackContextInitialState);
export const useTrackContext = () => useContext(TrackContext);

const TrackProvider: FC<PropsWithChildren & Partial<TrackContextValues>> = ({
  children,
  ...props
}) => {
  const [track, setTrack] = useState<ITrack | null>(props.track || null);
  const [isActive, setIsActive] = useState(props.isActive || false);
  const [volume, setVolume] = useState(props.volume || 100);
  const [time, setTime] = useState(props.time || 0);
  const [duration, setDuration] = useState(props.duration || 0);
  const [currentPlaylist, setCurrentPlaylist] = useState<ITrack[]>(props.currentPlaylist || []);

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

export default TrackProvider;
