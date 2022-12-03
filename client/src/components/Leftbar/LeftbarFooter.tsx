import { Typography, Box, Button } from "@mui/material";
import React from "react";
import Link from "next/link";
import { ERoutes } from "@typings/routes/ERoutes";
import { logout } from "@api/user";
import { useMutation } from "react-query";
import Router from "next/router";

const LeftbarFooter = () => {
  const { mutate: logoutMutate } = useMutation(logout, {
    onSuccess() {
      Router.push("/signin");
    }
  });

  const handleLogout = () => {
    logoutMutate();
  };

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
      <Button variant="contained" onClick={handleLogout} color="inherit">
        Logout
      </Button>
    </Box>
  );
};

export default LeftbarFooter;
