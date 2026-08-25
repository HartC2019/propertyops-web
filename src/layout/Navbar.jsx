import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useAuth } from "../auth/AuthContext";

const drawerWidth = 240;

export default function Navbar() {
  const { token, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  function handleDrawerToggle() {
    setMobileOpen((current) => !current);
  }

  function handleNavigation() {
    setMobileOpen(false);
  }

  if (!token) {
    return null;
  }

  const navigationItems = [
    {
      label: "Dashboard",
      to: "/",
    },
    {
      label: "Properties",
      to: "/properties",
    },
  ];

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar>
        <Typography variant="h6">PropertyPilot</Typography>
      </Toolbar>

      <Divider />

      <List>
        {navigationItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            onClick={handleNavigation}
            sx={{
              "&.active": {
                backgroundColor: "action.selected",
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <Button fullWidth variant="outlined" onClick={logout}>
          Log out
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <IconButton
          color="inherit"
          onClick={handleDrawerToggle}
          aria-label="open navigation menu"
        >
          <MenuIcon />
        </IconButton>
      </Box>
    </>
  );
}
