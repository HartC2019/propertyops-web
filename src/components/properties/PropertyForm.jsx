import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const initialFormData = {
  nickname: "",
  street: "",
  city: "",
  state: "",
  zip_code: "",
  cover_image_url: "",
  property_type: "",
  year_built: "",
  bedrooms: "",
  bathrooms: "",
  square_feet: "",
  purchase_price: "",
  purchase_date: "",
  monthly_rent: "",
  electric_paid_by: "Tenant",
  water_paid_by: "Tenant",
  gas_paid_by: "Tenant",
  trash_paid_by: "Tenant",
  notes: "",
};

const sectionPaperSx = {
  pt: { xs: 2, sm: 2.25 },
  px: { xs: 2, sm: 3 },
  pb: { xs: 2.5, sm: 3 },
};

function FormSection({ title, children }) {
  return (
    <Paper sx={sectionPaperSx}>
      <Typography variant="h6" sx={{ mb: 2.5 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

export default function PropertyForm({
  initialValues = {},
  onSubmit,
  cancelTo = "/properties",
  submitLabel = "Save Property",
}) {
  const [formData, setFormData] = useState({
    ...initialFormData,
    ...initialValues,
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  }

  function validateForm() {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!String(formData.nickname).trim()) {
      newErrors.nickname = "Property nickname is required.";
    }

    if (!String(formData.street).trim()) {
      newErrors.street = "Street address is required.";
    }

    if (!String(formData.city).trim()) {
      newErrors.city = "City is required.";
    }

    if (!String(formData.state).trim()) {
      newErrors.state = "State is required.";
    }

    if (!formData.zip_code) {
      newErrors.zip_code = "ZIP code is required.";
    }

    if (!formData.property_type) {
      newErrors.property_type = "Property type is required.";
    }

    if (formData.bedrooms === "" || formData.bedrooms === null) {
      newErrors.bedrooms = "Bedrooms are required.";
    } else if (Number(formData.bedrooms) < 0) {
      newErrors.bedrooms = "Bedrooms cannot be negative.";
    }

    if (formData.bathrooms === "" || formData.bathrooms === null) {
      newErrors.bathrooms = "Bathrooms are required.";
    } else if (Number(formData.bathrooms) <= 0) {
      newErrors.bathrooms = "Bathrooms must be greater than 0.";
    }

    if (formData.year_built === "" || formData.year_built === null) {
      newErrors.year_built = "Year built is required.";
    } else if (
      Number(formData.year_built) < 1800 ||
      Number(formData.year_built) > currentYear
    ) {
      newErrors.year_built = `Year built must be between 1800 and ${currentYear}.`;
    }

    if (Number(formData.square_feet) <= 0) {
      newErrors.square_feet = "Square feet must be greater than 0.";
    }

    if (formData.purchase_price !== "" && Number(formData.purchase_price) < 0) {
      newErrors.purchase_price = "Purchase price cannot be negative.";
    }

    if (formData.monthly_rent !== "" && Number(formData.monthly_rent) < 0) {
      newErrors.monthly_rent = "Monthly rent cannot be negative.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      setTimeout(() => {
        document.activeElement?.blur();

        const firstError = document.querySelector('[aria-invalid="true"]');

        firstError?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 0);

      return;
    }

    onSubmit(formData);
  }

  return (
    <Stack component="form" spacing={3} onSubmit={handleSubmit} noValidate>
      <FormSection title="Property Information">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 2,
          }}
        >
          <Box sx={{ gridColumn: "span 12" }}>
            <TextField
              fullWidth
              required
              label="Property Nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              error={Boolean(errors.nickname)}
              helperText={errors.nickname}
            />
          </Box>

          <Box sx={{ gridColumn: "span 12" }}>
            <TextField
              fullWidth
              required
              label="Street Address"
              name="street"
              value={formData.street}
              onChange={handleChange}
              error={Boolean(errors.street)}
              helperText={errors.street}
            />
          </Box>

          <Box sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
            <TextField
              fullWidth
              required
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={Boolean(errors.city)}
              helperText={errors.city}
            />
          </Box>

          <Box sx={{ gridColumn: { xs: "span 6", sm: "span 3" } }}>
            <TextField
              fullWidth
              required
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={Boolean(errors.state)}
              helperText={errors.state}
            />
          </Box>

          <Box sx={{ gridColumn: { xs: "span 6", sm: "span 3" } }}>
            <TextField
              fullWidth
              required
              label="ZIP Code"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              error={Boolean(errors.zip_code)}
              helperText={errors.zip_code}
            />
          </Box>
        </Box>
      </FormSection>

      <FormSection title="Property Image">
        <TextField
          fullWidth
          label="Cover Image URL"
          name="cover_image_url"
          value={formData.cover_image_url}
          onChange={handleChange}
          helperText="Optional. Leave blank and we’ll choose one of the default property images for you."
        />
      </FormSection>

      <FormSection title="Property Details">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 2,
          }}
        >
          <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
            <TextField
              fullWidth
              required
              select
              label="Property Type"
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              error={Boolean(errors.property_type)}
              helperText={errors.property_type}
            >
              {[
                "Single Family",
                "Duplex",
                "Triplex",
                "Fourplex",
                "Condo",
                "Townhome",
              ].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {[
            ["bedrooms", "Bedrooms"],
            ["bathrooms", "Bathrooms"],
            ["year_built", "Year Built"],
          ].map(([name, label]) => (
            <Box key={name} sx={{ gridColumn: { xs: "span 4", md: "span 2" } }}>
              <TextField
                fullWidth
                required
                type="number"
                label={label}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                error={Boolean(errors[name])}
                helperText={errors[name]}
                slotProps={
                  name === "bathrooms"
                    ? { htmlInput: { step: 0.5 } }
                    : undefined
                }
              />
            </Box>
          ))}

          <Box sx={{ gridColumn: "span 12" }}>
            <TextField
              fullWidth
              required
              type="number"
              label="Square Feet"
              name="square_feet"
              value={formData.square_feet}
              onChange={handleChange}
              error={Boolean(errors.square_feet)}
              helperText={errors.square_feet}
            />
          </Box>
        </Box>
      </FormSection>

      <FormSection title="Financial">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 2,
          }}
        >
          <Box sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
            <TextField
              fullWidth
              type="number"
              label="Purchase Price"
              name="purchase_price"
              value={formData.purchase_price}
              onChange={handleChange}
              error={Boolean(errors.purchase_price)}
              helperText={errors.purchase_price}
            />
          </Box>

          <Box sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
            <TextField
              fullWidth
              type="date"
              label="Purchase Date"
              name="purchase_date"
              value={formData.purchase_date}
              onChange={handleChange}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>

          <Box sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
            <TextField
              fullWidth
              type="number"
              label="Monthly Rental Income"
              name="monthly_rent"
              value={formData.monthly_rent}
              onChange={handleChange}
              error={Boolean(errors.monthly_rent)}
              helperText={errors.monthly_rent}
            />
          </Box>
        </Box>
      </FormSection>

      <FormSection title="Utilities">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 2,
          }}
        >
          {[
            ["electric_paid_by", "Electric"],
            ["water_paid_by", "Water"],
            ["gas_paid_by", "Gas"],
            ["trash_paid_by", "Trash"],
          ].map(([name, label]) => (
            <Box
              key={name}
              sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}
            >
              <TextField
                fullWidth
                select
                label={label}
                name={name}
                value={formData[name]}
                onChange={handleChange}
              >
                <MenuItem value="Tenant">Tenant</MenuItem>
                <MenuItem value="Landlord">Landlord</MenuItem>
                <MenuItem value="HOA">HOA</MenuItem>
              </TextField>
            </Box>
          ))}
        </Box>
      </FormSection>

      <FormSection title="Notes">
        <TextField
          fullWidth
          multiline
          rows={5}
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes about this property..."
        />
      </FormSection>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          gap: 1.5,
          pt: 1,
        }}
      >
        <Button component={RouterLink} to={cancelTo} variant="outlined">
          Cancel
        </Button>

        <Button type="submit" variant="contained">
          {submitLabel}
        </Button>
      </Box>
    </Stack>
  );
}
