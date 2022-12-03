import { List } from "@mui/material";
import { ERoutes } from "@typings/routes/ERoutes";
import React from "react";
import LeftbarListItem from "./LeftbarListItem";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SpeakerGroupIcon from "@mui/icons-material/SpeakerGroup";

const listUserItems = [
  {
    primary: "Music",
    to: ERoutes.HOME,
    icon: <MusicNoteIcon />
  },
  {
    primary: "Playlists",
    to: ERoutes.HOME,
    icon: <QueueMusicIcon />
  }
];

const listMusicianItems = [
  {
    primary: "Group",
    to: ERoutes.GROUP,
    icon: <SpeakerGroupIcon />
  }
];

interface LeftbarListProps {
  onClick?: (...args: unknown[]) => unknown;
}

const LeftbarList = ({ onClick }: LeftbarListProps) => {
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "left",
        padding: "0 20px"
      }}
    >
      {listUserItems.map(({ primary, to, icon }, index) => (
        <LeftbarListItem key={index} primary={primary} to={to} icon={icon} onClick={onClick} />
      ))}

      {listMusicianItems.map(({ primary, to, icon }, index) => (
        <LeftbarListItem key={index} primary={primary} to={to} icon={icon} onClick={onClick} />
      ))}
    </List>
  );
};

export default LeftbarList;
