import { Box } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { Dispatch, SetStateAction } from "react";
import { IComment } from "@typings/comment/IComment";
import { IUser } from "@typings/user/IUser";
import { useMutation } from "react-query";
import { deleteComment } from "@api/comment";

interface CommentActionsProps {
  comment: IComment;
  user: IUser;
  isReplying: boolean;
  setIsReplying: Dispatch<SetStateAction<boolean>>;
}

const CommentActions = ({ comment, user, setIsReplying }: CommentActionsProps) => {
  const { mutate: deleteMutation } = useMutation(deleteComment);

  const handleCommentReply = () => setIsReplying((prev) => !prev);

  const handleDeleteComment = () => {
    if (confirm("Are you sure?")) {
      deleteMutation(comment.id);
    }
  };

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
