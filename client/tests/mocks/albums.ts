import { IAlbum } from "@typings/album/IAlbum";
import { tracks } from "./tracks";
import { user } from "./user";

export const albums: IAlbum[] = [
  {
    id: 1,
    name: "Playlist1",
    tracks: [tracks[0]],
    user: user
  },
  {
    id: 2,
    name: "Playlist2",
    tracks: [tracks[1], tracks[2]],
    user: user
  },
  {
    id: 3,
    name: "Playlist3",
    tracks: [tracks[2]],
    user: user
  }
];
