import { useState } from "react";
import { Link, useNavigate } from "react-router";

import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useAuth } from "./AuthContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Stack spacing={3}>
          <Typography variant="h4" component="h1">
            Create your PropertyPilot account
          </Typography>

          <Box component="form" action={onRegister}>
            <Stack spacing={2}>
              <TextField
                label="Username"
                name="username"
                type="text"
                required
                fullWidth
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                required
                fullWidth
              />

              <TextField
                label="Confirm password"
                name="confirmPassword"
                type="password"
                required
                fullWidth
              />

              <Button type="submit" variant="contained">
                Create account
              </Button>

              {error && <Alert severity="error">{error}</Alert>}
            </Stack>
          </Box>

          <Typography>
            Already have an account? <Link to="/login">Log in</Link>
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
}
