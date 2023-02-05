import { deleteAlbum } from "../../api";
import { IAlbum } from "../../types";
import { IUser } from "modules/User";
import { useMutation, useQueryClient } from "react-query";
import { Box, IconButton, Typography } from "@mui/material";
import { ERoutes } from "types/routes/ERoutes";
import { MouseEvent } from "react";
import Router from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";

interface AlbumCardProps {
  album: IAlbum;
  user: IUser;
}

const AlbumCard = ({ album, user }: AlbumCardProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteMutation } = useMutation(deleteAlbum, {
    onSettled: () => queryClient.refetchQueries("myAlbums")
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

export default AlbumCard;
