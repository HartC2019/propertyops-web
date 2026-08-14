import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";
import { createProperty } from "../api/properties";

import PropertyForm from "../components/properties/PropertyForm";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994";

export default function CreatePropertyPage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  async function handleCreate(formData) {
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

      cover_image_url: formData.cover_image_url || DEFAULT_IMAGE,
    };

    try {
      await createProperty(propertyData, token);

      navigate("/properties");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" mb={4}>
        Add Property
      </Typography>

      <PropertyForm
        onSubmit={handleCreate}
        cancelTo="/properties"
        submitLabel="Save Property"
      />
    </Container>
  );
}
