import { Box } from "@mui/material";
import React from "react";
import useTrackStore from "store/track";

interface VolumeRangeProps {
  audio: HTMLAudioElement;
}

const VolumeRange = ({ audio }: VolumeRangeProps) => {
  const [volume, setVolume] = useTrackStore((state) => [state.volume, state.setVolume]);

  const changeVolume = (volume: number) => {
    setVolume(volume);
    audio.volume = volume / 100;
  };

  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      Volume:
      <input
        type="range"
        value={volume}
        onChange={(e) => changeVolume(+e.target.value)}
        min={0}
        max={100}
      />
      {volume}/100
    </Box>
  );
};

export default VolumeRange;
