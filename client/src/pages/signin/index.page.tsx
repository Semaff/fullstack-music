import React from "react";
import Link from "next/link";
import { Paper, Typography } from "@mui/material";
import { SignInForm } from "modules/User";
import { ERoutes } from "types/routes/ERoutes";

const SignInPage = () => {
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
      <SignInForm />
      <Link href={ERoutes.SIGNUP} style={{ textDecoration: "none", color: "inherit" }}>
        <Typography
          sx={{
            color: "inherit",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline"
            }
          }}
        >
          Don&apos;t have an account? Sign Up..
        </Typography>
      </Link>
    </Paper>
  );
};

export default SignInPage;
