import WithLeftbar from "layouts/WithLeftbar";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Track from "@components/Track/Track";
import { findMe } from "@api/user";
import { searchTracks } from "@api/tracks/searchTracks";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("findMe", () => findMe(token));
  await queryClient.prefetchQuery("tracks", () => searchTracks(token));

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

const Home = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  const { data: tracks } = useQuery(
    ["tracks", debouncedSearch],
    () => searchTracks(undefined, debouncedSearch),
    {
      refetchOnWindowFocus: false
    }
  );

  const handleSearchChange = (newValue: string) => {
    setSearch(newValue);
    clearTimeout(timer);
    const timerEl = setTimeout(() => {
      setDebouncedSearch(newValue);
    }, 300);
    setTimer(timerEl);
  };

  return (
    <WithLeftbar>
      <Box sx={{ py: "20px" }}>
        <Paper
          elevation={2}
          sx={{
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TextField
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            label="Search for tracks"
            variant="standard"
          />
        </Paper>

        {tracks &&
          tracks?.map((el) => (
            <Box key={el.id} onClick={() => Router.push("/track" + "/" + el.id)}>
              <Track playlist={tracks} track={el} />
            </Box>
          ))}
      </Box>
    </WithLeftbar>
  );
};

export default Home;
