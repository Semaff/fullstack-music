import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ERoutes } from "types/routes/ERoutes";
import Link from "next/link";
import React, { ReactNode } from "react";

export interface ItemProps {
  primary: string;
  to: ERoutes;
  secondary?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

const Item = ({ primary, to, icon, secondary, onClick }: ItemProps) => {
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <Link href={to} style={{ textDecoration: "none", color: "inherit" }}>
        <ListItemButton onClick={onClick}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText primary={primary} secondary={secondary} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default Item;
