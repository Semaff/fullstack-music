import { albumsHandlers } from "./albumsHandlers";
import { playlistsHandlers } from "./playlistsHandlers";
import { tracksHandlers } from "./tracksHandlers";
import { userHandlers } from "./userHandlers";
import { artistHandlers } from "./artistHandlers";

export const handlers = [
  ...userHandlers,
  ...tracksHandlers,
  ...playlistsHandlers,
  ...albumsHandlers,
  ...artistHandlers
];
