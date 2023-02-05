import React from "react";
import WithLeftbar from "layouts/WithLeftbar";
import { Avatar, Box, Typography } from "@mui/material";
import { findMe, ProfileForm, UserForm } from "modules/User";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("findMe", () => findMe(token));

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

const ProfilePage = () => {
  const { data: user } = useQuery("findMe", () => findMe(), {
    refetchOnWindowFocus: false
  });

  return (
    <WithLeftbar>
      <Box
        sx={{
          margin: "10px 0",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <Avatar sx={{ width: 100, height: 100 }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography>{user?.email}</Typography>
            </Box>
          </Box>
        </Box>

        {user && (
          <Box sx={{ marginTop: "10px" }}>
            <UserForm user={user} />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          margin: "10px 0",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px"
        }}
      >
        <Typography fontSize={32} sx={{ textAlign: "center" }}>
          {!user?.profile?.nickname ? "Want to be an artist?" : "Update Nickname"}
        </Typography>

        {user && (
          <Box sx={{ marginTop: "10px" }}>
            <ProfileForm user={user} />
          </Box>
        )}
      </Box>
    </WithLeftbar>
  );
};

export default ProfilePage;
