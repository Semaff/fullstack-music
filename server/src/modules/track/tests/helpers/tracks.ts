import { User } from "src/modules/auth/entities/user.entity";
import { CreateTrackDto } from "../../dto/create-track.dto";
import { UpdateTrackDto } from "../../dto/update-track.dto";
import { Track } from "../../entities/track.entity";

export const createTrackDto: CreateTrackDto = {
  name: "Track4"
};

export const updateTrackDto: UpdateTrackDto = {
  name: "Track10"
};

export const user: User = {
  id: 1,
  firstName: "Bob",
  lastName: "Bob",
  email: "bob@example.com",
  password: "Bob1!",
  albums: [],
  comments: [],
  playlists: [],
  tracks: []
};

export const tracks: Track[] = [
  {
    id: 1,
    name: "Track1",
    file: "../src/track1.mp3",
    album: null,
    playlists: null,
    comments: [],
    user
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
