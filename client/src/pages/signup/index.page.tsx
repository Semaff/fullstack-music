import React from "react";
import Link from "next/link";
import { Paper, Typography } from "@mui/material";
import { SignUpForm } from "modules/User";
import { ERoutes } from "types/routes/ERoutes";

const SignUpPage = () => {
  return (
    <Paper
      elevation={12}
      sx={{
        height: "100vh",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <SignUpForm />
      <Link href={ERoutes.SIGNIN} style={{ textDecoration: "none", color: "inherit" }}>
        <Typography
          sx={{
            color: "inherit",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline"
            }
          }}
        >
          Already have an account? Sign In..
        </Typography>
      </Link>
    </Paper>
  );
};

export default SignUpPage;
