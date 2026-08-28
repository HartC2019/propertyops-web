import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Box, Container, Typography } from "@mui/material";

import { useAuth } from "../auth/AuthContext";
import { createProperty } from "../api/properties";
import PropertyForm from "../components/properties/PropertyForm";
import { getDefaultPropertyImage } from "../utils/propertyImages";

export default function CreatePropertyPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleCreate(formData) {
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
      await createProperty(propertyData, token);
      navigate("/properties");
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to create property.");
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Add Property</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
          Add the details for a rental property to begin tracking it.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <PropertyForm
        onSubmit={handleCreate}
        cancelTo="/properties"
        submitLabel="Save Property"
      />
    </Container>
  );
}
