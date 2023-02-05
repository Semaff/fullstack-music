import React, { useState, FormEvent } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { createTrack } from "../../api";
import { validateName } from "utils/validations/validateName";
import TrackUploader from "../TrackUploader/TrackUploader";

const TrackForm = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [track, setTrack] = useState<File>();

  const isNameCorrect = validateName(name);
  const canSubmit = isNameCorrect && track;

  const { mutate: createTrackMutation } = useMutation(createTrack, {
    onSettled() {
      queryClient.refetchQueries("tracks");
      setTrack(undefined);
      setName("");
    }
  });

  const handleTrackChange = (file: File | undefined) => {
    if (file) {
      setTrack(file);
      setName(file.name);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) {
      createTrackMutation({ name, file: track });
    }
  };

  return (
    <Box
      data-testid="track-form"
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}
    >
      <TrackUploader track={track} setTrack={handleTrackChange} />

      {track && (
        <TextField
          fullWidth
          type="text"
          label="Track Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <Button type="submit" variant="contained" disabled={!canSubmit}>
        Upload
      </Button>
    </Box>
  );
};

export default TrackForm;
