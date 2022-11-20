import Menu from "@mui/icons-material/Menu";
import React, { Dispatch, SetStateAction } from "react";
import { Box, Button } from "@mui/material";
import Logo from "@components/Logo/Logo";

interface LeftbarUpperProps {
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

const LeftbarUpper = ({ setIsActive }: LeftbarUpperProps) => {
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

      <Logo />
    </Box>
  );
};

export default LeftbarUpper;
