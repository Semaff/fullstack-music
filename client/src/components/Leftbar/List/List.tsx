import MusicNoteIcon from "@mui/icons-material/MusicNote";
import UploadIcon from "@mui/icons-material/Upload";
import AlbumIcon from "@mui/icons-material/Album";
import PlaylistIcon from "@mui/icons-material/PlaylistAdd";
import { ERoutes } from "types/routes/ERoutes";
import { IUser } from "modules/User";
import { Divider, List as MaterialList } from "@mui/material";
import Item from "../Item/Item";

const userItems = [
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

const profileUserItems = [
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

interface ListProps {
  onClick?: () => void;
  user?: IUser;
}

const List = ({ onClick, user }: ListProps) => {
  return (
    <MaterialList
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "left",
        padding: "0 10px"
      }}
    >
      {userItems.map(({ primary, to, icon }, index) => (
        <Item key={index} primary={primary} to={to} icon={icon} onClick={onClick} />
      ))}

      {user?.profile?.nickname && (
        <>
          <Divider sx={{ my: "10px" }} />

          {profileUserItems.map(({ primary, to, icon }, index) => (
            <Item key={index} primary={primary} to={to} icon={icon} onClick={onClick} />
          ))}
        </>
      )}
    </MaterialList>
  );
};

export default List;
