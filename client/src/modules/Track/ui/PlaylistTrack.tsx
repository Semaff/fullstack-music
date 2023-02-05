import { IconButton } from "@mui/material";
import { ITrack } from "modules/Track/types/ITrack";
import React from "react";
import Track from "./TrackCard/TrackCard";
import DoneIcon from "@mui/icons-material/Done";
import { useMutation, useQueryClient } from "react-query";
import { IPlaylist } from "modules/Playlist/types/IPlaylist";
import { addTracks, removeTracks } from "modules/Playlist/api";

interface PlaylistTrackProps {
  track: ITrack;
  playlist: IPlaylist;
}

const PlaylistTrack = ({ track, playlist }: PlaylistTrackProps) => {
  const queryClient = useQueryClient();
  const isAlbumTrack = !!playlist?.tracks.find((el) => track.id === el.id);

  const { mutate: addTracksMutation } = useMutation(addTracks, {
    onSettled: () => queryClient.refetchQueries("playlist")
  });

  const { mutate: removeTracksMutation } = useMutation(removeTracks, {
    onSettled: () => queryClient.refetchQueries("playlist")
  });

  const addTrackToAlbum = () => {
    addTracksMutation({ id: playlist.id, tracks: [track] });
  };

  const removeTrackFromAlbum = () => {
    removeTracksMutation({ id: playlist.id, tracks: [track] });
  };

  const toggleIsAlbumTrack = () => {
    if (isAlbumTrack) {
      removeTrackFromAlbum();
    } else {
      addTrackToAlbum();
    }
  };

  return (
    <Track playlist={playlist.tracks} track={track}>
      <IconButton
        onClick={toggleIsAlbumTrack}
        sx={{ backgroundColor: isAlbumTrack ? "#efefef" : "unset" }}
      >
        <DoneIcon />
      </IconButton>
    </Track>
  );
};

export default PlaylistTrack;
