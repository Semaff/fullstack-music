import React from "react";
import WithLeftbar from "layouts/WithLeftbar";
import { Box } from "@mui/material";
import { findMyPlaylists, PlaylistCard, PlaylistForm } from "modules/Playlist";
import { findMe } from "modules/User";
import { GetServerSideProps } from "next";
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

const PlaylistsPage = () => {
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
            {playlists.map((el) => (
              <PlaylistCard key={el.id} playlist={el} user={user} />
            ))}
          </Box>
        )}
      </Box>
    </WithLeftbar>
  );
};

export default PlaylistsPage;
