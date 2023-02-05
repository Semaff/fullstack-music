import { Box, Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Menu } from "@mui/icons-material";
import { ERoutes } from "types/routes/ERoutes";
import Logo from "ui/Logo/Logo";
import Router from "next/router";

interface UpperProps {
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

const Upper = ({ setIsActive }: UpperProps) => {
  return (
    <Box
      sx={{
        padding: "10px",
        display: { lg: "none", xs: "flex" },
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Button color="inherit" onClick={() => setIsActive((prev) => !prev)}>
        <Menu />
      </Button>

      <Logo onClick={() => Router.push(ERoutes.HOME)} />
    </Box>
  );
};

export default Upper;
