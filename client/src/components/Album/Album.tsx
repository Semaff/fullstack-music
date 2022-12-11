import { Box, IconButton, Typography } from "@mui/material";
import { IAlbum } from "@typings/album/IAlbum";
import { ERoutes } from "@typings/routes/ERoutes";
import Router from "next/router";
import React, { MouseEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "react-query";
import { deleteAlbum } from "@api/album";
import { IUser } from "@typings/user/IUser";

interface AlbumProps {
  album: IAlbum;
  user: IUser;
}

const Album = ({ album, user }: AlbumProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteMutation } = useMutation(deleteAlbum, {
    onSettled() {
      queryClient.refetchQueries("myAlbums");
    }
  });

  const handleDeleteTrack = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deleteMutation(album.id);
  };

  return (
    <Box
      onClick={() => Router.push(ERoutes.ALBUM + "/" + album.id)}
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
      <Typography>{album.name}</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Typography>Amount of Tracks - {album.tracks.length}</Typography>
        {user.profile?.nickname === album?.user.profile?.nickname && (
          <IconButton onClick={handleDeleteTrack}>
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Album;
