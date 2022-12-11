import { createAlbum } from "@api/album";
import { Box, Button, TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { validateName } from "utils/validations/validateName";

const AlbumForm = () => {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const isNameCorrect = validateName(name);
  const canSubmit = isNameCorrect;

  const { mutate: createMutation } = useMutation(createAlbum, {
    onSettled() {
      queryClient.refetchQueries("myAlbums");
    }
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
        label="Name of the album"
        type="text"
        error={name.length > 0 && !isNameCorrect}
        helperText={name.length > 0 && !isNameCorrect ? "Invalid name" : ""}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button type="submit" variant="contained" disabled={!canSubmit}>
        Create Album
      </Button>
    </Box>
  );
};

export default AlbumForm;
