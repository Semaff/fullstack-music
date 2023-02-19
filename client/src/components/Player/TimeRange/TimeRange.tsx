import React from "react";
import useTrackStore from "store/track";
import CustomSlider from "ui/Slider/Slider";

interface TimeRangeProps {
  audio: HTMLAudioElement;
}

const TimeRange = ({ audio }: TimeRangeProps) => {
  const [time, setTime] = useTrackStore((state) => [state.time, state.setTime]);
  const duration = useTrackStore((state) => state.duration);

  const handleChangeTime = (time: number) => {
    setTime(time);
    audio.currentTime = time;
  };

  return (
    <CustomSlider
      sx={{ flexBasis: "20%" }}
      value={time}
      onChange={handleChangeTime}
      min={0}
      max={duration}
      label="Time"
    />
  );
};

export default TimeRange;
