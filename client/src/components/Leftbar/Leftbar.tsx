import { Paper, Box } from "@mui/material";
import { IUser } from "modules/User";
import React, { useState } from "react";
import List from "./ui/List/List";
import Upper from "./ui/Upper/Upper";
import Header from "./ui/Header/Header";
import Footer from "./ui/Footer/Footer";
import { userItems } from "./constants/userItems";
import { profileUserItems } from "./constants/profileUserItems";

interface LeftbarProps {
  user: IUser;
}

const Leftbar = ({ user }: LeftbarProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleBackdropClick = () => {
    setIsActive(false);
  };

  return (
    <>
      <Upper setIsActive={setIsActive} />

      {isActive && (
        <Box
          data-testid="leftbar-backdrop"
          onClick={handleBackdropClick}
          sx={{
            position: "fixed",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            zIndex: 10
          }}
        />
      )}

      <Paper
        data-testid="leftbar-container"
        sx={{
          position: "fixed",
          backgroundColor: "#fff",
          left: 0,
          top: 0,
          zIndex: 2000,
          flexDirection: "column",
          height: "100vh",
          width: 240,
          padding: "30px 10px",
          display: { lg: "flex", xs: isActive ? "flex" : "none" }
        }}
      >
        <Header />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <List items={userItems} />
          {user.profile?.nickname && <List items={profileUserItems} />}
        </Box>
        <Footer />
      </Paper>
    </>
  );
};

export default Leftbar;
