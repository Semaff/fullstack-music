import { ERoutes } from "@typings/routes/ERoutes";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";
import { Typography } from "@mui/material";

interface LogoProps {
  onClick?: (...args: unknown[]) => unknown;
}

const Logo = ({ onClick }: LogoProps) => {
  return (
    <Link
      onClick={onClick}
      href={ERoutes.HOME}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        textDecoration: "none",
        color: "#000"
      }}
    >
      <GoogleIcon />
      <Typography
        sx={{
          fontSize: "24px",
          textTransform: "uppercase"
        }}
      >
        Logo
      </Typography>
    </Link>
  );
};

export default Logo;
