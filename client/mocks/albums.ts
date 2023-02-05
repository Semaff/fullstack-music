import { IAlbum } from "modules/Album/types/IAlbum";
import { tracks } from "./tracks";
import { user } from "./user";

export const album: IAlbum = {
  id: 1,
  name: "Album",
  tracks,
  user
};

export const albums: IAlbum[] = [
  {
    id: 1,
    name: "Album 1",
    tracks: tracks.slice(0, 1),
    user
  },
  {
    id: 2,
    name: "Album 2",
    tracks: tracks.slice(0, 2),
    user
  },
  {
    id: 3,
    name: "Album 3",
    tracks: tracks.slice(-1),
    user
  }
];
