import React, { useEffect, useRef } from "react";
import { Paper, Box, Typography } from "@mui/material";
import { formatName } from "utils/formatName";
import PlayerControl from "./Controller/Controller";
import PlayerTimeRange from "./TimeRange/TimeRange";
import PlayerVolumeRange from "./VolumeRange/VolumeRange";
import useTrackStore from "store/track";

const Player = () => {
  console.log(1, useTrackStore());
  const [track, setTrack] = useTrackStore((state) => [state.track, state.setTrack]);
  const [isActive, setIsActive] = useTrackStore((state) => [state.isActive, state.setIsActive]);
  const { currentPlaylist, volume, setTime, setDuration } = useTrackStore();

  const audioRef = useRef<HTMLAudioElement | null>(new Audio());

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    changeAudio();
  }, [track]);

  useEffect(() => {
    toggleAudioPlayback();
  }, [isActive]);

  const changeAudio = () => {
    const audio = audioRef.current;
    if (!audio || !track) return;

    audio.src = track.file;
    audio.volume = volume / 100;
    audio.currentTime = 0;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    audio.ontimeupdate = () => {
      setTime(audio.currentTime);
    };

    audio.onended = () => {
      if (!currentPlaylist) {
        setIsActive(false);
        return;
      }
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
    const audio = audioRef.current;
    if (!track || !audio) return;

    if (!isActive) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Failed to play audio:", error);
        setIsActive(false);
      });
    }
  };

  if (!track || !audioRef.current) {
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
        width: "100vw"
      }}
      elevation={5}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Typography fontSize={20}>{formatName(track.name)}</Typography>
      </Box>

      <PlayerVolumeRange audio={audioRef.current} />
      <PlayerTimeRange audio={audioRef.current} />
      <PlayerControl audio={audioRef.current} />
    </Paper>
  );
};

export default Player;
