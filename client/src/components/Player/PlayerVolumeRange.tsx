import { Box } from "@mui/material";
import { useTrackContext } from "contexts/TrackContext/TrackContext";
import React from "react";

interface PlayerVolumeRangeProps {
  audio: HTMLAudioElement | null;
}

const PlayerVolumeRange = ({ audio }: PlayerVolumeRangeProps) => {
  const { volume, setVolume } = useTrackContext();

  const changeVolume = (volume: number) => {
    setVolume(volume);
    if (audio) {
      audio.volume = volume / 100;
    }
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

export default PlayerVolumeRange;
