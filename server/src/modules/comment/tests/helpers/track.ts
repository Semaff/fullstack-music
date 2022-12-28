import { CreateTrackDto } from "src/modules/track/dto/create-track.dto";
import { Track } from "src/modules/track/entities/track.entity";
import { user } from "./user";

export const createTrackDto: CreateTrackDto = {
  name: "Track"
};

export const track: Track = {
  id: 1,
  name: "Track1",
  file: "../src/track1.mp3",
  album: null,
  playlists: null,
  comments: [],
  user: user
};
