import { Box } from "@mui/material";
import React from "react";
import useTrackStore from "store/track";

interface TimeRangeProps {
  audio: HTMLAudioElement;
}

const TimeRange = ({ audio }: TimeRangeProps) => {
  const [time, setTime] = useTrackStore((state) => [state.time, state.setTime]);
  const duration = useTrackStore((state) => state.duration);

  const changeTime = (time: number) => {
    setTime(time);
    audio.currentTime = time;
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

export default TimeRange;
