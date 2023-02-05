import React, { FormEvent, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { createPlaylist } from "../../api";
import { useMutation, useQueryClient } from "react-query";
import { validateName } from "utils/validations/validateName";

const PlaylistForm = () => {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const isNameCorrect = validateName(name);
  const canSubmit = isNameCorrect;

  const { mutate: createMutation } = useMutation(createPlaylist, {
    onSettled: () => queryClient.refetchQueries("myPlaylists")
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) {
      createMutation({ name });
      setName("");
    }
  };

  return (
    <Box
      data-testid="playlist-form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        maxWidth: "360px",
        margin: "0 auto"
      }}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        label="Name of the playlist"
        type="text"
        error={name.length > 0 && !isNameCorrect}
        helperText={name.length > 0 && !isNameCorrect ? "Invalid name" : ""}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button type="submit" variant="contained" disabled={!canSubmit}>
        Create Playlist
      </Button>
    </Box>
  );
};

export default PlaylistForm;
