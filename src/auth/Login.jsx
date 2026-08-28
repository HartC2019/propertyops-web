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

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function onLogin(formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      setError(null);
      await login({ username, password });
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
            <Typography variant="h4">Welcome back</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.75 }}
            >
              Log in to manage your properties and finances.
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" action={onLogin}>
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
                autoComplete="current-password"
              />

              <Button type="submit" variant="contained" fullWidth>
                Log in
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
