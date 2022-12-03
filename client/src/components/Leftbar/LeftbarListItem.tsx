import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ERoutes } from "@typings/routes/ERoutes";
import Link from "next/link";
import React, { ReactNode } from "react";

export interface LeftbarListItemProps {
  primary: string;
  to: ERoutes;
  secondary?: string;
  icon?: ReactNode;
  onClick?: (...args: unknown[]) => unknown;
}

const LeftbarListItem = ({ primary, to, icon, secondary, onClick }: LeftbarListItemProps) => {
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

export default LeftbarListItem;
