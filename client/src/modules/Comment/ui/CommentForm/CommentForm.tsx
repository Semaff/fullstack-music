import React, { FormEvent, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { IComment } from "../../types";
import { createComment } from "../../api";
import { useMutation, useQueryClient } from "react-query";
import { ITrack } from "modules/Track";

interface CommentFormProps {
  track: ITrack;
  parentComment?: IComment;
}

const CommentForm = ({ track, parentComment }: CommentFormProps) => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const canSubmit = text.length > 0;

  const { mutate: createMutation } = useMutation(createComment, {
    onSettled() {
      queryClient.refetchQueries("track");
      queryClient.refetchQueries(["comment", parentComment?.id]);
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) {
      createMutation({ text, trackId: track.id, parentId: parentComment?.id });
      setText("");
    }
  };

  return (
    <Box
      data-testid="comment-form"
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
        label="Your comment.."
        type="text"
        multiline
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button type="submit" variant="contained" disabled={!canSubmit}>
        Create Comment
      </Button>
    </Box>
  );
};

export default CommentForm;
