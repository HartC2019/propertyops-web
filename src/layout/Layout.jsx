import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import { useAuth } from "../auth/AuthContext";

const drawerWidth = 240;

export default function Layout() {
  const { token } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          width: token
            ? {
                md: `calc(100% - ${drawerWidth}px)`,
              }
            : "100%",
        }}
      >
        {token && <Toolbar sx={{ display: { xs: "flex", md: "none" } }} />}

        <Outlet />
      </Box>
    </Box>
  );
}
