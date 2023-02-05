import { IComment } from "modules/Comment/types/IComment";
import { ITrack } from "modules/Track/types/ITrack";
import { user } from "./user";

// We must use mockedTrack, because with the default one it'll create circular dependency
const mockedTrack: ITrack = {
  id: 1,
  name: "Track",
  file: "../",
  comments: [],
  user
};

export const comment: IComment = {
  id: 1,
  text: "Comment",
  track: mockedTrack,
  user,
  children: []
};

export const comments: IComment[] = [
  {
    id: 1,
    text: "Comment 1",
    track: mockedTrack,
    user,
    children: []
  },
  {
    id: 2,
    text: "Comment 2",
    track: mockedTrack,
    user,
    children: [{ id: 3, text: "Comment 3", track: mockedTrack, user, children: [] }]
  },
  {
    id: 3,
    text: "Comment 3",
    track: mockedTrack,
    user,
    children: [],
    parent: {
      id: 1,
      text: "Comment 2",
      track: mockedTrack,
      user,
      children: []
    }
  }
];
