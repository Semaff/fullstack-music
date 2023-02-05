import { ITrack } from "modules/Track/types/ITrack";
import { comments } from "./comments";
import { user } from "./user";

export const track: ITrack = {
  id: 1,
  name: "Track",
  file: "../",
  comments,
  user
};

export const tracks: ITrack[] = [
  {
    id: 1,
    name: "Track 1",
    file: "../",
    comments: comments.slice(0, 1),
    user
  },
  {
    id: 2,
    name: "Track 2",
    file: "../",
    comments: comments.slice(-1),
    user
  },
  {
    id: 3,
    name: "Track 3",
    file: "../",
    comments: [],
    user
  }
];
