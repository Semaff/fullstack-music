import { Box } from "@mui/material";
import { ERoutes } from "types/routes/ERoutes";
import Router from "next/router";
import Logo from "ui/Logo/Logo";

const Header = () => {
  function handleLogoClick() {
    Router.push(ERoutes.HOME);
  }

  return (
    <Box data-testid="leftbar-header" sx={{ mb: 2 }}>
      <Logo onClick={handleLogoClick} />
    </Box>
  );
};

export default Header;
