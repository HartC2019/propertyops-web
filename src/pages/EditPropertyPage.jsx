import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import { useAuth } from "../auth/AuthContext";
import { getProperty, updateProperty } from "../api/properties";
import PropertyForm from "../components/properties/PropertyForm";
import { getDefaultPropertyImage } from "../utils/propertyImages";

export default function EditPropertyPage() {
  const { propertyId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProperty() {
      try {
        const data = await getProperty(propertyId, token);
        setProperty(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unable to load property.");
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [propertyId, token]);

  async function handleUpdate(formData) {
    setError("");

    const propertyData = {
      ...formData,
      zip_code: Number(formData.zip_code),
      year_built: formData.year_built ? Number(formData.year_built) : null,
      bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
      bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
      square_feet: formData.square_feet ? Number(formData.square_feet) : null,
      purchase_price: formData.purchase_price
        ? Number(formData.purchase_price)
        : null,
      monthly_rent: formData.monthly_rent
        ? Number(formData.monthly_rent)
        : null,
      purchase_date: formData.purchase_date || null,
      cover_image_url: formData.cover_image_url || getDefaultPropertyImage(),
    };

    try {
      await updateProperty(propertyId, propertyData, token);
      navigate(`/properties/${propertyId}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to update property.");
    }
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography>Loading property...</Typography>
        </Stack>
      </Container>
    );
  }

  if (error && !property) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Edit Property</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
          Update the property details and save your changes.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <PropertyForm
        initialValues={property}
        onSubmit={handleUpdate}
        cancelTo={`/properties/${propertyId}`}
        submitLabel="Save Changes"
      />
    </Container>
  );
}
