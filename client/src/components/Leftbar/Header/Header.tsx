import { Box } from "@mui/material";
import { ERoutes } from "types/routes/ERoutes";
import Router from "next/router";
import Logo from "ui/Logo/Logo";

const LeftbarHeader = () => {
  return (
    <Box sx={{ marginBottom: "20px" }}>
      <Logo onClick={() => Router.push(ERoutes.HOME)} />
    </Box>
  );
};

export default LeftbarHeader;
