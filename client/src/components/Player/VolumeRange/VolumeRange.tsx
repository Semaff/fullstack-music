import React from "react";
import useTrackStore from "store/track";
import CustomSlider from "ui/Slider/Slider";

interface VolumeRangeProps {
  audio: HTMLAudioElement;
}

const VolumeRange = ({ audio }: VolumeRangeProps) => {
  const [volume, setVolume] = useTrackStore((state) => [state.volume, state.setVolume]);

  const handleChangeVolume = (volume: number) => {
    setVolume(volume);
    audio.volume = volume / 100;
  };

  return (
    <CustomSlider
      sx={{ flexBasis: "20%" }}
      value={volume}
      onChange={handleChangeVolume}
      min={0}
      max={100}
      label="Volume"
    />
  );
};

export default VolumeRange;
