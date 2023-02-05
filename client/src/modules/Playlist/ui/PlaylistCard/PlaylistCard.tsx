import React, { MouseEvent } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { IPlaylist } from "../../types";
import { IUser } from "modules/User";
import { deletePlaylist } from "../../api";
import { ERoutes } from "types/routes/ERoutes";
import Router from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";

interface PlaylistCardProps {
  playlist: IPlaylist;
  user: IUser;
}

const PlaylistCard = ({ playlist, user }: PlaylistCardProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteMutation } = useMutation(deletePlaylist, {
    onSettled: () => queryClient.refetchQueries("myPlaylists")
  });

  const handleDeleteTrack = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deleteMutation(playlist.id);
  };

  return (
    <Box
      data-testid="playlist"
      onClick={() => Router.push(ERoutes.PLAYLIST + "/" + playlist.id)}
      sx={{
        cursor: "pointer",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        backgroundColor: "#fff",
        transition: "all .2s linear",
        "&:hover": {
          backgroundColor: "#f1f1f1"
        }
      }}
    >
      <Typography>{playlist.name}</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Typography>Amount of Tracks - {playlist.tracks.length}</Typography>
        {user.profile?.nickname === playlist?.user.profile?.nickname && (
          <IconButton onClick={handleDeleteTrack}>
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default PlaylistCard;
