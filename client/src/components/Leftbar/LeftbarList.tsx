import { Divider, List } from "@mui/material";
import { ERoutes } from "@typings/routes/ERoutes";
import React from "react";
import LeftbarListItem from "./LeftbarListItem";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import UploadIcon from "@mui/icons-material/Upload";
import AlbumIcon from "@mui/icons-material/Album";
import { IUser } from "@typings/user/IUser";

const userItems = [
  {
    primary: "Music",
    to: ERoutes.HOME,
    icon: <MusicNoteIcon />
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

interface LeftbarListProps {
  onClick?: (...args: unknown[]) => unknown;
  user?: IUser;
}

const LeftbarList = ({ onClick, user }: LeftbarListProps) => {
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "left",
        padding: "0 10px"
      }}
    >
      {userItems.map(({ primary, to, icon }, index) => (
        <LeftbarListItem key={index} primary={primary} to={to} icon={icon} onClick={onClick} />
      ))}

      {user?.profile?.nickname && (
        <>
          <Divider sx={{ my: "10px" }} />

          {profileUserItems.map(({ primary, to, icon }, index) => (
            <LeftbarListItem key={index} primary={primary} to={to} icon={icon} onClick={onClick} />
          ))}
        </>
      )}
    </List>
  );
};

export default LeftbarList;
