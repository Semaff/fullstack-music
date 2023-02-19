import { ReactNode } from "react";
import { ERoutes } from "types/routes/ERoutes";

export interface ILeftbarItem {
  primary: string;
  secondary?: string;
  to: ERoutes;
  icon: ReactNode;
}
