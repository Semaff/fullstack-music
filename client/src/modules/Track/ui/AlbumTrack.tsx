import { IconButton } from "@mui/material";
import { ITrack } from "modules/Track/types/ITrack";
import React from "react";
import Track from "./TrackCard/TrackCard";
import DoneIcon from "@mui/icons-material/Done";
import { IAlbum } from "modules/Album/types/IAlbum";
import { useMutation, useQueryClient } from "react-query";
import { addTracks, removeTracks } from "modules/Album/api";

interface AlbumTrackProps {
  album: IAlbum;
  track: ITrack;
  playlist: ITrack[];
}

const AlbumTrack = ({ track, album, playlist }: AlbumTrackProps) => {
  const queryClient = useQueryClient();
  const isAlbumTrack = !!album?.tracks.find((el) => track.id === el.id);

  const { mutate: addTracksMutation } = useMutation(addTracks, {
    onSettled() {
      queryClient.refetchQueries("album");
    }
  });

  const { mutate: removeTracksMutation } = useMutation(removeTracks, {
    onSettled() {
      queryClient.refetchQueries("album");
    }
  });

  const addTrackToAlbum = () => {
    if (confirm("If this track is already in other album it will overwrite it! Are you sure?")) {
      addTracksMutation({ id: album.id, tracks: [track] });
    }
  };

  const removeTrackFromAlbum = () => {
    removeTracksMutation({ id: album.id, tracks: [track] });
  };

  const toggleIsAlbumTrack = () => {
    if (isAlbumTrack) {
      removeTrackFromAlbum();
    } else {
      addTrackToAlbum();
    }
  };

  return (
    <Track playlist={playlist} track={track}>
      <IconButton
        onClick={toggleIsAlbumTrack}
        sx={{ backgroundColor: isAlbumTrack ? "#efefef" : "unset" }}
      >
        <DoneIcon />
      </IconButton>
    </Track>
  );
};

export default AlbumTrack;
