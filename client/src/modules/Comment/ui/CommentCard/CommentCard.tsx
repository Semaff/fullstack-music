import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { findById } from "../../api";
import { IComment } from "../../types";
import { ITrack } from "modules/Track";
import { IUser } from "modules/User";
import { useQuery, useQueryClient } from "react-query";
import CommentActions from "./CommentActions/CommentActions";
import CommentForm from "../CommentForm/CommentForm";
import Image from "next/image";

interface CommentCardProps {
  track: ITrack;
  comment: IComment;
  user: IUser;
}

const CommentCard = ({ track, comment, user }: CommentCardProps) => {
  const queryClient = useQueryClient();
  const [isReplying, setIsReplying] = useState(false);
  const [isChildrenOpen, setIsChildrenOpen] = useState(false);
  const { data: commentWithChildren } = useQuery(
    ["comment", comment.id],
    () => findById(comment.id),
    { enabled: isChildrenOpen }
  );

  const handleChildrenToggle = () => {
    if (isChildrenOpen) queryClient.setQueryData(["comment", comment.id], null);
    setIsChildrenOpen((prev) => !prev);
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid #e1e1e1",
          padding: "10px"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image src="" alt="track" width={100} height={100} />
          <Typography fontSize={20}>{comment.text}</Typography>
        </Box>

        <CommentActions
          comment={comment}
          user={user}
          isReplying={isReplying}
          setIsReplying={setIsReplying}
        />
      </Box>

      <Button onClick={handleChildrenToggle}>Open nested comments</Button>

      {commentWithChildren?.children?.map((el) => (
        <Box
          key={el.id}
          sx={{
            border: "1px solid #e1e1e1",
            padding: "10px",
            marginLeft: "20px"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image src="" alt="track" width={100} height={100} />
            <Typography fontSize={20}>{el.text}</Typography>
          </Box>
        </Box>
      ))}

      {isReplying && <CommentForm track={track} parentComment={comment} />}
    </>
  );
};

export default CommentCard;
