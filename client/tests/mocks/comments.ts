import { IComment } from "@typings/comment/IComment";
import { user } from "./user";

const track1 = {
  id: 1,
  name: "Track1",
  file: "track",
  comments: [],
  user: user
};

const track2 = {
  id: 2,
  name: "Track2",
  file: "track",
  comments: [],
  user: user
};

export const comments: IComment[] = [
  {
    id: 1,
    text: "Yellow1",
    track: track1,
    user: user,
    children: []
  },
  {
    id: 2,
    text: "Yellow2",
    track: track2,
    user: user,
    children: [{ id: 3, text: "Yellow3", track: track2, user: user, children: [] }]
  },
  {
    id: 3,
    text: "Yellow3",
    track: track2,
    user: user,
    children: [],
    parent: {
      id: 1,
      text: "Yellow2",
      track: track2,
      user: user,
      children: []
    }
  }
];
