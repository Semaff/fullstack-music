import Link from "next/link";
import Router from "next/router";
import { Box, Button, Typography } from "@mui/material";
import { logout } from "modules/User";
import { useMutation, useQueryClient } from "react-query";
import { ERoutes } from "types/routes/ERoutes";

const Footer = () => {
  const queryClient = useQueryClient();

  const { mutate: logoutMutate } = useMutation(logout, {
    onSuccess() {
      queryClient.resetQueries("findMe");
      Router.push(ERoutes.SIGNIN);
    }
  });

  return (
    <Box data-testid="leftbar-footer" sx={{ marginTop: "auto", textAlign: "center" }}>
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

      <Button variant="contained" onClick={() => logoutMutate()} color="inherit">
        Logout
      </Button>
    </Box>
  );
};

export default Footer;
