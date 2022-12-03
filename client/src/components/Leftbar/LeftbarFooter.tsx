import { Typography, Box } from "@mui/material";
import React from "react";
import Link from "next/link";
import { ERoutes } from "@typings/routes/ERoutes";

const LeftbarFooter = () => {
  return (
    <Box
      sx={{
        marginTop: "auto",
        textAlign: "center"
      }}
    >
      <Link style={{ textDecoration: "none", color: "inherit" }} href={ERoutes.PROFILE}>
        <Typography
          fontSize={20}
          sx={{
            color: "inherit",
            "&:hover": {
              textDecoration: "underline"
            }
          }}
        >
          My Profile
        </Typography>
      </Link>
    </Box>
  );
};

export default LeftbarFooter;
