import GoogleIcon from "@mui/icons-material/Google";
import React from "react";
import { Typography, Button } from "@mui/material";

interface LogoProps {
  onClick?: () => void;
}

const Logo = ({ onClick }: LogoProps) => {
  return (
    <Button
      disableElevation
      disableRipple
      onClick={onClick}
      color="inherit"
      sx={{
        border: "1px solid transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        "&:hover": {
          backgroundColor: "transparent"
        },
        "&:focus": {
          borderColor: "#000"
        }
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
    </Button>
  );
};

export default Logo;
