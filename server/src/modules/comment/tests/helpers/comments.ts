import { CreateCommentDto } from "../../dto/create-comment.dto";
import { UpdateCommentDto } from "../../dto/update-comment.dto";
import { Comment } from "../../entities/comment.entity";
import { track } from "./track";
import { user } from "./user";

export const createCommentDto: CreateCommentDto = {
  text: "Hello",
  trackId: 1
};

export const updateCommentDto: UpdateCommentDto = {
  text: "HelloHey"
};

export const comments: Comment[] = [
  {
    id: 1,
    text: "Hey",
    track: track,
    children: [],
    parent: null,
    user: user
  },
  {
    id: 2,
    text: "Hey",
    track: track,
    children: [{ id: 3, text: "Hey", track: track, children: [], parent: null, user: user }],
    parent: null,
    user: user
  },
  {
    id: 3,
    text: "Hey",
    track: track,
    children: [],
    parent: {
      id: 2,
      text: "Hey",
      track: track,
      children: [],
      parent: null,
      user: user
    },
    user: user
  }
];
