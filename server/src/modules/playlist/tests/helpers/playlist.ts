import { CreatePlaylistDto } from "../../dto/create-playlist.dto";
import { UpdatePlaylistDto } from "../../dto/update-playlist.dto";
import { Playlist } from "../../entities/playlist.entity";
import { tracks } from "./track";
import { user } from "./user";

export const createPlaylistDto: CreatePlaylistDto = {
  name: "Hey"
};

export const updatePlaylistDto: UpdatePlaylistDto = {
  name: "Hey102"
};

export const playlists: Playlist[] = [
  {
    id: 1,
    name: "Hey",
    tracks,
    user: user
  },
  {
    id: 2,
    name: "Hey2",
    tracks,
    user: user
  },
  {
    id: 3,
    name: "Hey3",
    tracks,
    user: user
  }
];
