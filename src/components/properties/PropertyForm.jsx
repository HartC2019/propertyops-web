import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Button,
  Box,
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

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <Stack component="form" spacing={4} onSubmit={handleSubmit}>
      {/* Property Information */}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Property Information
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 2,
          }}
        >
          <Box sx={{ gridColumn: { xs: "span 12" } }}>
            <TextField
              fullWidth
              required
              label="Property Nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ gridColumn: { xs: "span 12" } }}>
            <TextField
              fullWidth
              required
              label="Street Address"
              name="street"
              value={formData.street}
              onChange={handleChange}
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
            />
          </Box>
        </Box>
      </Paper>

      {/* Property Image */}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Property Image
        </Typography>

        <TextField
          fullWidth
          label="Cover Image URL"
          name="cover_image_url"
          value={formData.cover_image_url}
          onChange={handleChange}
          helperText="Optional. Leave blank to use the default property image."
        />
      </Paper>

      {/* Property Details */}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Property Details
        </Typography>
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
              select
              label="Property Type"
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
            >
              <MenuItem value="Single Family">Single Family</MenuItem>
              <MenuItem value="Duplex">Duplex</MenuItem>
              <MenuItem value="Triplex">Triplex</MenuItem>
              <MenuItem value="Fourplex">Fourplex</MenuItem>
              <MenuItem value="Condo">Condo</MenuItem>
              <MenuItem value="Townhome">Townhome</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ gridColumn: { xs: "span 4", md: "span 2" } }}>
            <TextField
              fullWidth
              type="number"
              label="Bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ gridColumn: { xs: "span 4", md: "span 2" } }}>
            <TextField
              fullWidth
              type="number"
              slotProps={{
                htmlInput: {
                  step: 0.5,
                },
              }}
              label="Bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ gridColumn: { xs: "span 4", md: "span 2" } }}>
            <TextField
              fullWidth
              type="number"
              label="Year Built"
              name="year_built"
              value={formData.year_built}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ gridColumn: { xs: "span 12" } }}>
            <TextField
              fullWidth
              type="number"
              label="Square Feet"
              name="square_feet"
              value={formData.square_feet}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </Paper>

      {/* Financial */}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Financial
        </Typography>
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
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Box>

          <Box sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
            <TextField
              fullWidth
              type="number"
              label="Monthly Rent"
              name="monthly_rent"
              value={formData.monthly_rent}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </Paper>

      {/* Utilities */}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Utilities
        </Typography>
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
      </Paper>

      {/* Notes */}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Notes
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={5}
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes about this property..."
        />
      </Paper>

      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          component={RouterLink}
          to={cancelTo}
          variant="outlined"
          size="large"
        >
          Cancel
        </Button>

        <Button type="submit" variant="contained" size="large">
          {submitLabel}
        </Button>
      </Stack>
    </Stack>
  );
}
