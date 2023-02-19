import { Box, IconButton } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Menu } from "@mui/icons-material";
import { ERoutes } from "types/routes/ERoutes";
import Logo from "ui/Logo/Logo";
import Router from "next/router";

interface UpperProps {
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

const Upper = ({ setIsActive }: UpperProps) => {
  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  const handleLogoClick = () => {
    Router.push(ERoutes.HOME);
  };

  return (
    <Box
      data-testid="leftbar-upper"
      sx={{
        p: 1,
        display: { xs: "flex", lg: "none" },
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <IconButton aria-label="leftbar-upper-btn" color="inherit" onClick={handleToggle}>
        <Menu />
      </IconButton>

      <Logo onClick={handleLogoClick} />
    </Box>
  );
};

export default Upper;
