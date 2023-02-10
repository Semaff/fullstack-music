import React, { useEffect } from "react";
import { Paper, Box, Typography } from "@mui/material";
import { formatName } from "utils/formatName";
import PlayerControl from "./Controller/Controller";
import PlayerTimeRange from "./TimeRange/TimeRange";
import PlayerVolumeRange from "./VolumeRange/VolumeRange";
import useTrackStore from "store/track";
import Image from "next/image";

let audio: HTMLAudioElement | null = null;

const Player = () => {
  const [track, setTrack] = useTrackStore((state) => [state.track, state.setTrack]);
  const [isActive, setIsActive] = useTrackStore((state) => [state.isActive, state.setIsActive]);
  const { currentPlaylist, volume, setTime, setDuration } = useTrackStore((state) => state);

  useEffect(() => {
    if (!audio) audio = new Audio();
  }, []);

  useEffect(() => {
    changeAudio();
  }, [track]);

  useEffect(() => {
    toggleAudioPlayback();
  }, [isActive]);

  const changeAudio = () => {
    if (!audio || !track) return;

    audio.src = track.file;
    audio.volume = volume / 100;
    audio.currentTime = 0;

    audio.onloadedmetadata = () => {
      setDuration(audio?.duration || 0);
    };

    audio.ontimeupdate = () => {
      setTime(audio?.currentTime || 0);
    };

    audio.onended = () => {
      if (!currentPlaylist) return;
      const trackIndex = currentPlaylist.findIndex((el) => el.id === track.id);
      const nextTrack = currentPlaylist[trackIndex + 1];
      if (!nextTrack) {
        setIsActive(false);
      } else {
        setTrack(nextTrack);
      }
    };
  };

  const toggleAudioPlayback = () => {
    if (!track || !isActive) {
      // wrong
      audio?.pause();
    } else {
      audio?.play();
    }
  };

  if (!track || !audio) {
    return null;
  }

  return (
    <Paper
      data-testid="player"
      sx={{
        backgroundColor: "#fff",
        position: "fixed",
        bottom: 0,
        left: 0,
        height: "100px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100vw",
        paddingLeft: "250px"
      }}
      elevation={5}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Typography fontSize={20}>{formatName(track?.name || "")}</Typography>
      </Box>

      <PlayerVolumeRange audio={audio} />
      <PlayerTimeRange audio={audio} />

      {track.id && <PlayerControl audio={audio} />}
    </Paper>
  );
};

export default Player;
