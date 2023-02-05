import React from "react";
import WithLeftbar from "layouts/WithLeftbar";
import { Box } from "@mui/material";
import { CommentCard, CommentForm } from "modules/Comment";
import { findById, TrackCard } from "modules/Track";
import { findMe } from "modules/User";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const trackId = +(query.id || -1);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("track", () => findById(trackId));

  const token = req.cookies.token;
  await queryClient.prefetchQuery("findMe", () => findMe(token));

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

const TrackPage = () => {
  const { query } = useRouter();
  const { data: track } = useQuery("track", () => findById(+(query.id || -1)), {
    refetchOnWindowFocus: false
  });

  const { data: user } = useQuery("findMe", () => findMe(), {
    refetchOnWindowFocus: false
  });

  return (
    <WithLeftbar>
      <Box sx={{ py: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {track && (
          <>
            <TrackCard track={track} playlist={[]} />

            <Box
              sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "#fff"
              }}
            >
              <CommentForm track={track} />
            </Box>
          </>
        )}

        {user && track && track.comments.length > 0 && (
          <Box
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              backgroundColor: "#fff"
            }}
          >
            {track.comments.map((el) => (
              <CommentCard key={el.id} track={track} comment={el} user={user} />
            ))}
          </Box>
        )}
      </Box>
    </WithLeftbar>
  );
};

export default TrackPage;
