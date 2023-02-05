import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import { IComment } from "../../../types";
import { deleteComment } from "../../../api";
import { useMutation } from "react-query";
import { IUser } from "modules/User";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";

interface CommentActionsProps {
  comment: IComment;
  user: IUser;
  isReplying: boolean;
  setIsReplying: Dispatch<SetStateAction<boolean>>;
}

const CommentActions = ({ comment, user, setIsReplying }: CommentActionsProps) => {
  const { mutate: deleteMutation } = useMutation(deleteComment);

  const handleCommentReply = () => setIsReplying((prev) => !prev);

  const handleDeleteComment = () => confirm("Are you sure?") && deleteMutation(comment.id);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
      <Box
        onClick={handleCommentReply}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginTop: "5px",
          cursor: "pointer",
          userSelect: "none"
        }}
      >
        <ReplyIcon width={10} height={10} /> Reply
      </Box>

      {comment.user.id === user.id && (
        <Box
          onClick={handleDeleteComment}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginTop: "5px",
            cursor: "pointer",
            userSelect: "none"
          }}
        >
          <DeleteIcon width={10} height={10} /> Delete comment
        </Box>
      )}
    </Box>
  );
};

export default CommentActions;
