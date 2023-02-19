import { ERoutes } from "types/routes/ERoutes";
import { ILeftbarItem } from "../types/ILeftbarItem";
import PlaylistIcon from "@mui/icons-material/PlaylistAdd";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export const userItems: ILeftbarItem[] = [
  {
    primary: "Music",
    to: ERoutes.HOME,
    icon: <MusicNoteIcon />
  },
  {
    primary: "Playlists",
    to: ERoutes.PLAYLIST,
    icon: <PlaylistIcon />
  }
];
