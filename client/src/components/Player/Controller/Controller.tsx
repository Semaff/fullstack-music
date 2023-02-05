import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import React from "react";
import useTrackStore from "store/track";

interface ControllerProps {
  audio: HTMLAudioElement;
}

const Controller = ({ audio }: ControllerProps) => {
  const [isActive, setIsActive] = useTrackStore((state) => [state.isActive, state.setIsActive]);

  const handlePlayTrack = () => {
    setIsActive(true);
    audio.play();
  };

  const handlePauseTrack = () => {
    setIsActive(false);
    audio.pause();
  };

  return isActive ? (
    <IconButton onClick={handlePauseTrack}>
      <PauseIcon fontSize="large" />
    </IconButton>
  ) : (
    <IconButton onClick={handlePlayTrack}>
      <PlayArrowIcon fontSize="large" />
    </IconButton>
  );
};

export default Controller;
