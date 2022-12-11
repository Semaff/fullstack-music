import { findById } from "@api/album";
import { findMyTracks } from "@api/tracks";
import AlbumTrack from "@components/Track/AlbumTrack";
import Track from "@components/Track/Track";
import { Box, Button, Typography } from "@mui/material";
import WithLeftbar from "layouts/WithLeftbar";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const token = req.cookies.token;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("myTracks", () => findMyTracks(token));

  const albumId = +(query.id || -1);
  await queryClient.prefetchQuery("album", () => findById(albumId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

const AlbumItemPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { query } = useRouter();
  const { data: tracks } = useQuery("myTracks", () => findMyTracks());
  const { data: album } = useQuery("album", () => findById(+(query.id || -1)));

  const canRenderAlbumTracks = album && album.tracks.length > 0;
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
          <Typography>{album?.name}</Typography>
          <Typography>Amount of Tracks - {album?.tracks?.length}</Typography>
        </Box>

        <Button onClick={handleEditToggle} variant="contained">
          {!isEdit ? "Add Tracks" : "Done"}
        </Button>

        {!isEdit
          ? canRenderAlbumTracks &&
            album &&
            album.tracks.map((el) => (
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
                <Track playlist={album.tracks} track={el} />
              </Box>
            ))
          : canRenderTracks &&
            album &&
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
                <AlbumTrack playlist={album.tracks} album={album} track={el} />
              </Box>
            ))}
      </Box>
    </WithLeftbar>
  );
};

export default AlbumItemPage;
