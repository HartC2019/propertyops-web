import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  AppBar,
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
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useAuth } from "../auth/AuthContext";

const drawerWidth = 240;

export default function Navbar() {
  const { token, logout } = useAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  function handleDrawerToggle() {
    setMobileOpen((current) => !current);
  }

  function handleNavigation() {
    setMobileOpen(false);
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
    <Box sx={{ height: "100%" }}>
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

  if (!token) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={NavLink}
            to="/login"
            sx={{
              color: "inherit",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            PropertyPilot
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          display: { md: "none" },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            aria-label="open navigation menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6">PropertyPilot</Typography>
        </Toolbar>
      </AppBar>

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
    </>
  );
}
