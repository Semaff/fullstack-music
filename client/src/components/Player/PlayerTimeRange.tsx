import { Box } from "@mui/material";
import { useTrackContext } from "contexts/TrackContext/TrackContext";
import React from "react";

interface PlayerTimeRangeProps {
  audio: HTMLAudioElement | null;
}

const PlayerTimeRange = ({ audio }: PlayerTimeRangeProps) => {
  const { time, setTime, duration } = useTrackContext();

  const changeTime = (time: number) => {
    setTime(time);
    if (audio) {
      audio.currentTime = time;
    }
  };

  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      Time:
      <input
        type="range"
        value={time}
        onChange={(e) => changeTime(+e.target.value)}
        min={0}
        max={duration}
      />
      {Math.floor(time)}/{Math.floor(duration)}
    </Box>
  );
};

export default PlayerTimeRange;
