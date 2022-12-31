import { findMyAlbums } from "@api/album/findMyAlbums";
import { findMe } from "@api/user";
import Album from "@components/Album/Album";
import AlbumForm from "@components/Forms/AlbumForm";
import { Box } from "@mui/material";
import WithLeftbar from "@layouts/WithLeftbar";
import { GetServerSideProps } from "next";
import React from "react";
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

const AlbumPage = () => {
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
              <Album key={el.id} album={el} user={user} />
            ))}
          </Box>
        )}
      </Box>
    </WithLeftbar>
  );
};

export default AlbumPage;
