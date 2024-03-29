import React from "react";
import WithLeftbar from "layouts/WithLeftbar";
import { Box, Typography } from "@mui/material";
import { TrackForm } from "modules/Track";

const UploadPage = () => {
  return (
    <WithLeftbar>
      <Box sx={{ py: "20px" }}>
        <Typography fontSize={32} sx={{ textAlign: "center" }}>
          Upload your track
        </Typography>
        <TrackForm />
      </Box>
    </WithLeftbar>
  );
};

export default UploadPage;
