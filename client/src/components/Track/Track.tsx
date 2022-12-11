import { Paper, Typography, Box, IconButton } from "@mui/material";
import { ITrack } from "@typings/tracks/ITrack";
import { useTrackContext } from "contexts/TrackContext/TrackContext";
import Image from "next/image";
import React from "react";
import { formatName } from "utils/formatName";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTrack } from "@api/tracks/deleteTrack";
import { findMe } from "@api/user";

interface TrackProps {
  track: ITrack;
}

const Track = ({ track }: TrackProps) => {
  const { track: activeTrack, isActive, setIsActive, setTrack } = useTrackContext();

  /* Find Me */
  const { data: user } = useQuery("findMe", () => findMe(), {
    refetchOnWindowFocus: false
  });

  /* Mutations */
  const queryClient = useQueryClient();
  const { mutate: deleteMutation } = useMutation(deleteTrack, {
    onSettled() {
      queryClient.refetchQueries("tracks");
    }
  });

  const handlePlayTrack = () => {
    if (track.id !== activeTrack?.id) {
      setTrack(track);
    }
    setIsActive(true);
  };

  const handlePauseTrack = () => {
    setIsActive(false);
  };

  const handleDeleteTrack = () => {
    if (track.id === activeTrack?.id) {
      setTrack(null);
      setIsActive(false);
    }

    deleteMutation({ id: track.id });
  };

  return (
    <Paper
      elevation={2}
      sx={{
        my: "10px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src="https://placehold.jp/100x100.png" alt="track" width={100} height={100} />
        <Typography fontSize={20}>{formatName(track.name)}</Typography>
      </Box>

      <Box>
        {track.id === activeTrack?.id && isActive ? (
          <IconButton onClick={handlePauseTrack}>
            <PauseIcon fontSize="large" />
          </IconButton>
        ) : (
          <IconButton onClick={handlePlayTrack}>
            <PlayArrowIcon fontSize="large" />
          </IconButton>
        )}

        {track.user.profile.nickname === user?.profile?.nickname && (
          <IconButton onClick={handleDeleteTrack}>
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};

export default Track;
