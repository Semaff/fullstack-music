import { IPlaylist } from "modules/Playlist/types/IPlaylist";
import { tracks } from "./tracks";
import { user } from "./user";

export const playlist: IPlaylist = {
  id: 1,
  name: "Playlist",
  tracks,
  user
};

export const playlists: IPlaylist[] = [
  {
    id: 1,
    name: "Playlist 1",
    tracks: tracks.slice(0, 1),
    user: user
  },
  {
    id: 2,
    name: "Playlist 2",
    tracks: tracks.slice(0, 2),
    user: user
  },
  {
    id: 3,
    name: "Playlist 3",
    tracks: tracks.slice(-1),
    user: user
  }
];
