import { ITrack } from "@typings/tracks/ITrack";
import { comments } from "./comments";
import { user } from "./user";

export const tracks: ITrack[] = [
  {
    id: 1,
    name: "Track1",
    file: "track",
    comments: [comments[0]],
    user: user
  },
  {
    id: 2,
    name: "Track2",
    file: "track",
    comments: [comments[1]],
    user: user
  },
  {
    id: 3,
    name: "Track3",
    file: "track",
    comments: [],
    user: user
  }
];
