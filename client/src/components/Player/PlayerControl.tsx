import { IconButton } from "@mui/material";
import { useTrackContext } from "contexts/TrackContext/TrackContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import React from "react";

interface PlayerControlProps {
  audio: HTMLAudioElement | null;
}

const PlayerControl = ({ audio }: PlayerControlProps) => {
  const { isActive, setIsActive } = useTrackContext();

  const handlePlayTrack = () => {
    setIsActive(true);
    audio?.play();
  };

  const handlePauseTrack = () => {
    setIsActive(false);
    audio?.pause();
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

export default PlayerControl;
