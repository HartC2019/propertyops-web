import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useAuth } from "../auth/AuthContext";
import { getProperties } from "../api/properties";
import PropertyCard from "../components/properties/PropertyCard";

export default function PropertiesPage() {
  const { token } = useAuth();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await getProperties(token);
        setProperties(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unable to load properties.");
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      loadProperties();
    }
  }, [token]);

  if (loading) {
    return (
      <Container sx={{ py: 6 }}>
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography>Loading properties...</Typography>
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">Properties</Typography>

        <Button component={RouterLink} to="/properties/new" variant="contained">
          Add Property
        </Button>
      </Stack>

      {properties.length === 0 ? (
        <Stack spacing={2} alignItems="center" sx={{ mt: 8 }}>
          <Typography variant="h6">No properties yet.</Typography>

          <Typography color="text.secondary">
            Add your first rental property to get started.
          </Typography>

          <Button
            component={RouterLink}
            to="/properties/new"
            variant="contained"
          >
            Add Property
          </Button>
        </Stack>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </Box>
      )}
    </Container>
  );
}
