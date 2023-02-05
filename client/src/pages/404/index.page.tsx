import React from "react";
import { Box, Typography } from "@mui/material";

const Custom404Page = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh"
      }}
    >
      <Typography sx={{ fontSize: { sm: "44px", xs: "24px" } }}>404 - Page Not Found</Typography>
    </Box>
  );
};

export default Custom404Page;
