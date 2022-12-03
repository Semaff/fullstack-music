import { Paper, Box } from "@mui/material";
import React, { useState } from "react";
import LeftbarFooter from "./LeftbarFooter";
import LeftbarHeader from "./LeftbarHeader";
import LeftbarList from "./LeftbarList";
import LeftbarUpper from "./LeftbarUpper";

const Leftbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <LeftbarUpper setIsActive={setIsActive} />

      {isActive && (
        <Box
          onClick={() => setIsActive(false)}
          sx={{
            display: { lg: "none", xs: "flex" },
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            zIndex: "10",
            top: 0,
            left: 0
          }}
        />
      )}

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
        <LeftbarHeader />
        <LeftbarList />
        <LeftbarFooter />
      </Paper>
    </>
  );
};

export default Leftbar;
