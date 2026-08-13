import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login({ username, password });
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
            Log in to PropertyPilot
          </Typography>

          <Box component="form" action={onLogin}>
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

              <Button type="submit" variant="contained">
                Log in
              </Button>

              {error && <Alert severity="error">{error}</Alert>}
            </Stack>
          </Box>

          <Typography>
            Don't have an account? <Link to="/register">Create one</Link>
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
}
