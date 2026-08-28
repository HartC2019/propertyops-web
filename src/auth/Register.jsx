import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useAuth } from "./AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function onRegister(formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError(null);
      await register({ username, password });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 8 } }}>
      <Paper sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4">Create your account</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.75 }}
            >
              Start managing your rental portfolio in one place.
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" action={onRegister}>
            <Stack spacing={2.5}>
              <TextField
                label="Username"
                name="username"
                type="text"
                required
                fullWidth
                autoComplete="username"
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                required
                fullWidth
                autoComplete="new-password"
              />

              <TextField
                label="Confirm password"
                name="confirmPassword"
                type="password"
                required
                fullWidth
                autoComplete="new-password"
              />

              <Button type="submit" variant="contained" fullWidth>
                Create account
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Already have an account? <Link to="/login">Log in</Link>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
