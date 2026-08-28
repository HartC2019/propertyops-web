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
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import logo from "../assets/propertyops-logo.svg";
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
    { label: "Dashboard", to: "/" },
    { label: "Properties", to: "/properties" },
  ];

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar sx={{ px: 2.5, minHeight: 72 }}>
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Box
            component="img"
            src={logo}
            alt=""
            sx={{ width: 28, height: 28 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            PropertyPilot
          </Typography>
        </Stack>
      </Toolbar>

      <Divider />

      <List sx={{ px: 1.25, py: 1.5 }}>
        {navigationItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            onClick={handleNavigation}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              px: 1.5,
              py: 1.1,
              color: "text.secondary",
              "& .MuiListItemText-primary": {
                fontWeight: 600,
              },
              "&.active": {
                bgcolor: "primary.light",
                color: "primary.dark",
                "& .MuiListItemText-primary": {
                  fontWeight: 700,
                },
              },
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 2.5 }}>
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
          ModalProps={{ keepMounted: true }}
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
              borderRightColor: "divider",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: 8,
          left: 8,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <IconButton
          color="inherit"
          onClick={handleDrawerToggle}
          aria-label="Open navigation menu"
          sx={{ bgcolor: "background.paper", boxShadow: 1 }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
    </>
  );
}
