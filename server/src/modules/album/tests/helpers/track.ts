import { CreateTrackDto } from "../../../track/dto/create-track.dto";
import { Track } from "../../../track/entities/track.entity";
import { user } from "./user";

export const createTrackDto: CreateTrackDto = {
  name: "Track"
};

export const tracks: Track[] = [
  {
    id: 1,
    name: "Track1",
    file: "../src/track1.mp3",
    album: null,
    playlists: null,
    comments: [],
    user: user
  },
  {
    id: 2,
    name: "Track2",
    file: "../src/track2.mp3",
    album: null,
    playlists: null,
    comments: [],
    user
  },
  {
    id: 3,
    name: "Track3",
    file: "../src/track3.mp3",
    album: null,
    playlists: null,
    comments: [],
    user
  }
];
