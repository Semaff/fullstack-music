import { ERoutes } from "types/routes/ERoutes";
import UploadIcon from "@mui/icons-material/Upload";
import AlbumIcon from "@mui/icons-material/Album";
import { ILeftbarItem } from "../types/ILeftbarItem";

export const profileUserItems: ILeftbarItem[] = [
  {
    primary: "Albums",
    to: ERoutes.ALBUM,
    icon: <AlbumIcon />
  },
  {
    primary: "Upload Music",
    to: ERoutes.UPLOAD,
    icon: <UploadIcon />
  }
];
