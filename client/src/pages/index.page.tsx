import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { TextField, Box, Paper } from "@mui/material";
import { findMe } from "modules/User";
import { searchTracks, TrackCard } from "modules/Track";
import Router from "next/router";
import WithLeftbar from "layouts/WithLeftbar";

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

const HomePage = () => {
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
            inputProps={{ "data-testid": "search-field" }}
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            label="Search for tracks"
            variant="standard"
          />
        </Paper>

        {tracks &&
          tracks?.map((el) => (
            <Box key={el.id} onClick={() => Router.push("/track" + "/" + el.id)}>
              <TrackCard playlist={tracks} track={el} />
            </Box>
          ))}
      </Box>
    </WithLeftbar>
  );
};

export default HomePage;
