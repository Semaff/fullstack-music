import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import React from "react";
import { ILeftbarItem } from "components/Leftbar/types/ILeftbarItem";

const Item = ({ primary, to, icon, secondary }: ILeftbarItem) => {
  return (
    <ListItem role="listitem" disablePadding sx={{ display: "block" }}>
      <Link role="link" href={to} style={{ textDecoration: "none", color: "inherit" }}>
        <ListItemButton>
          {icon && <ListItemIcon role="img">{icon}</ListItemIcon>}
          <ListItemText primary={primary} secondary={secondary} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default Item;
