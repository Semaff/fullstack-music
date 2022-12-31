import { findMyPlaylists } from "@api/playlist";
import { findMe } from "@api/user";
import PlaylistForm from "@components/Forms/PlaylistForm";
import Playlist from "@components/Playlist/Playlist";
import { Box } from "@mui/material";
import WithLeftbar from "@layouts/WithLeftbar";
import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("myPlaylists", () => findMyPlaylists(token));
  await queryClient.prefetchQuery("findMe", () => findMe(token));

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

const PlaylistPage = () => {
  const { data: playlists } = useQuery("myPlaylists", () => findMyPlaylists(), {
    refetchOnWindowFocus: false
  });

  const { data: user } = useQuery("findMe", () => findMe(), {
    refetchOnWindowFocus: false
  });

  return (
    <WithLeftbar>
      <Box
        sx={{
          py: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        <Box sx={{ backgroundColor: "#fff", padding: "32px 10px" }}>
          <PlaylistForm />
        </Box>

        {user && playlists && playlists.length > 0 && (
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "32px 10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            {playlists?.map((el) => (
              <Playlist key={el.id} playlist={el} user={user} />
            ))}
          </Box>
        )}
      </Box>
    </WithLeftbar>
  );
};

export default PlaylistPage;
