import TrackForm from "@components/Forms/TrackForm";
import WithLeftbar from "layouts/WithLeftbar";
import React from "react";
import { Box, Typography } from "@mui/material";

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
