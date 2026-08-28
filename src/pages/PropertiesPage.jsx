import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useAuth } from "../auth/AuthContext";
import { getProperties } from "../api/properties";
import PropertyCard from "../components/properties/PropertyCard";

export default function PropertiesPage() {
  const { token } = useAuth();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return properties;
    }

    return properties.filter((property) => {
      const nickname = String(property.nickname || "").toLowerCase();
      const street = String(property.street || "").toLowerCase();

      return (
        nickname.includes(normalizedSearch) || street.includes(normalizedSearch)
      );
    });
  }, [properties, searchTerm]);

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
      <Stack spacing={3}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: { xs: "flex-end", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4">Properties</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Keep your rental portfolio organized in one place.
            </Typography>
          </Box>

          <Button
            component={RouterLink}
            to="/properties/new"
            variant="contained"
            sx={{ flexShrink: 0 }}
          >
            Add Property
          </Button>
        </Box>

        <Box sx={{ pb: 2 }}>
          {properties.length > 0 && (
            <TextField
              fullWidth
              label="Search properties"
              placeholder="Search by name or street number"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        </Box>
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
      ) : filteredProperties.length === 0 ? (
        <Stack
          spacing={1}
          alignItems="center"
          sx={{ mt: 8, textAlign: "center" }}
        >
          <Typography variant="h6">No matching properties</Typography>
          <Typography color="text.secondary">
            Try a property name or a different street number.
          </Typography>
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
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </Box>
      )}
    </Container>
  );
}
