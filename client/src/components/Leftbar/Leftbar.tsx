import { Paper, Box } from "@mui/material";
import { IUser } from "modules/User";
import React, { useState } from "react";
import List from "./List/List";
import Upper from "./Upper/Upper";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

interface LeftbarProps {
  user: IUser | undefined;
}

const Leftbar = ({ user }: LeftbarProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Upper setIsActive={setIsActive} />

      <Box
        onClick={() => setIsActive(false)}
        sx={{
          display: { lg: "none", xs: isActive ? "flex" : "none" },
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          zIndex: "10",
          top: 0,
          left: 0
        }}
      />

      <Paper
        sx={{
          position: "fixed",
          backgroundColor: "#fff",
          left: 0,
          top: 0,
          zIndex: "2000",
          display: { lg: "flex", xs: isActive ? "flex" : "none" },
          flexDirection: "column",
          height: "100vh",
          width: "240px",
          padding: "30px 10px"
        }}
      >
        <Header />
        <List user={user} />
        <Footer />
      </Paper>
    </>
  );
};

export default Leftbar;
