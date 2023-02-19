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

  const handleTogglePlay = () => {
    setIsActive(!isActive);

    if (isActive) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  return (
    <IconButton data-testid={isActive ? "pause-btn" : "play-btn"} onClick={handleTogglePlay}>
      {isActive ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
    </IconButton>
  );
};

export default Controller;
