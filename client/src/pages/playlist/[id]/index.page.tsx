import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { findById } from "modules/Playlist";
import { findMyTracks, TrackCard } from "modules/Track";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import PlaylistTrack from "modules/Track/ui/PlaylistTrack";
import WithLeftbar from "layouts/WithLeftbar";

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const token = req.cookies.token;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("myTracks", () => findMyTracks(token));

  const albumId = +(query.id || -1);
  await queryClient.prefetchQuery("playlist", () => findById(albumId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

const PlaylistPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { query } = useRouter();
  const { data: tracks } = useQuery("myTracks", () => findMyTracks());
  const { data: playlist } = useQuery("playlist", () => findById(+(query.id || -1)));

  const canRenderPlaylistTracks = playlist && playlist.tracks.length > 0;
  const canRenderTracks = tracks && tracks.length > 0;

  const handleEditToggle = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <WithLeftbar>
      <Box sx={{ py: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff"
          }}
        >
          <Typography>{playlist?.name}</Typography>
          <Typography data-testid="playlist-length">
            Amount of Tracks - {playlist?.tracks?.length}
          </Typography>
        </Box>

        <Button onClick={handleEditToggle} variant="contained" data-testid="edit-button">
          {!isEdit ? "Add Tracks" : "Done"}
        </Button>

        {!isEdit
          ? canRenderPlaylistTracks &&
            playlist &&
            playlist.tracks.map((el) => (
              <Box
                key={el.id}
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  backgroundColor: "#fff"
                }}
              >
                <TrackCard playlist={playlist.tracks} track={el} />
              </Box>
            ))
          : canRenderTracks &&
            playlist &&
            tracks.map((el) => (
              <Box
                key={el.id}
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  backgroundColor: "#fff"
                }}
              >
                <PlaylistTrack playlist={playlist} track={el} />
              </Box>
            ))}
      </Box>
    </WithLeftbar>
  );
};

export default PlaylistPage;
