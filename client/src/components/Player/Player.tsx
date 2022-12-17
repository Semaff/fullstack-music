import React, { useEffect } from "react";
import { Paper, Box, Typography } from "@mui/material";
import { useTrackContext } from "contexts/TrackContext/TrackContext";
import { formatName } from "utils/formatName";
import { useQuery } from "react-query";
import { findMe } from "@api/user";
import PlayerControl from "./PlayerControl";
import PlayerTimeRange from "./PlayerTimeRange";
import PlayerVolumeRange from "./PlayerVolumeRange";

let audio: HTMLAudioElement | null = null;

const Player = () => {
  const { data: user } = useQuery("findMe", () => findMe(), {
    refetchOnWindowFocus: false
  });

  const {
    track,
    setTrack,
    currentPlaylist,
    isActive,
    setIsActive,
    volume,
    setVolume,
    setTime,
    setDuration
  } = useTrackContext();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    }

    changeAudio();
  }, [track]);

  useEffect(() => {
    changeIsPlaying();
  }, [isActive]);

  const changeAudio = () => {
    if (audio && track) {
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
        const trackIndex = currentPlaylist.findIndex((el) => el.id === track.id);
        const nextTrack = currentPlaylist[trackIndex + 1];
        if (!nextTrack) {
          setIsActive(false);
        } else {
          setTrack(nextTrack);
        }
      };
      changeIsPlaying();
    }
  };

  const resetSettings = () => {
    setDuration(0);
    setVolume(100);
    setIsActive(false);
    setTime(0);
    setTrack(null);
  };

  const changeIsPlaying = () => {
    if (audio && track) {
      if (isActive) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  };

  if (!track || !user) {
    if (audio) {
      resetSettings();
      audio.pause();
      audio = null;
    }

    return null;
  }

  return (
    <Paper
      sx={{
        marginLeft: "240px",
        backgroundColor: "#fff",
        position: "fixed",
        bottom: "0",
        height: "100px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "calc(100% - 240px)"
      }}
      elevation={5}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src="https://placehold.jp/80x80.png" alt="track" width={80} height={80} />
        <Typography fontSize={20}>{formatName(track?.name || "")}</Typography>
      </Box>

      <PlayerVolumeRange audio={audio} />
      <PlayerTimeRange audio={audio} />

      {track.id && <PlayerControl audio={audio} />}
    </Paper>
  );
};

export default Player;
