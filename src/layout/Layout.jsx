import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

const drawerWidth = 240;

export default function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
          },
        }}
      >
        <Toolbar sx={{ display: { xs: "flex", md: "none" } }} />

        <Outlet />
      </Box>
    </Box>
  );
}
