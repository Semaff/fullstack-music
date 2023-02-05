import React from "react";
import WithLeftbar from "layouts/WithLeftbar";
import { Box } from "@mui/material";
import { AlbumCard, AlbumForm, findMyAlbums } from "modules/Album";
import { findMe } from "modules/User";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("myAlbums", () => findMyAlbums(token));
  await queryClient.prefetchQuery("findMe", () => findMe(token));

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

const AlbumsPage = () => {
  const { data: albums } = useQuery("myAlbums", () => findMyAlbums(), {
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
          <AlbumForm />
        </Box>

        {user && albums && albums.length > 0 && (
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "32px 10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            {albums?.map((el) => (
              <AlbumCard key={el.id} album={el} user={user} />
            ))}
          </Box>
        )}
      </Box>
    </WithLeftbar>
  );
};

export default AlbumsPage;
