import React from "react";
import { Box, Typography } from "@mui/material";

const Custom500Page = () => {
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
      <Typography sx={{ fontSize: { sm: "44px", xs: "24px" } }}>
        500 - Internal server error
      </Typography>
    </Box>
  );
};

export default Custom500Page;
