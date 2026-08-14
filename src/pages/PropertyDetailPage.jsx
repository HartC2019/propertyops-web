import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import { useAuth } from "../auth/AuthContext";
import { deleteProperty, getProperty } from "../api/properties";

export default function PropertyDetailPage() {
  const { propertyId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    async function loadProperty() {
      try {
        const data = await getProperty(propertyId, token);
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [propertyId, token]);

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography>Loading property...</Typography>
        </Stack>
      </Container>
    );
  }

  async function handleDelete() {
    try {
      await deleteProperty(propertyId, token);

      navigate("/properties");
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to delete property.");
    }
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button component={RouterLink} to="/properties" sx={{ mb: 3 }}>
        ← Back to Properties
      </Button>

      <Card>
        <CardMedia
          component="img"
          height="320"
          image={property.cover_image_url}
          alt={property.nickname}
        />

        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={3}
          >
            <Box>
              <Typography variant="h4">{property.nickname}</Typography>

              <Typography color="text.secondary">{property.street}</Typography>

              <Typography color="text.secondary">
                {property.city}, {property.state} {property.zip_code}
              </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                component={RouterLink}
                to={`/properties/${property.id}/edit`}
              >
                Edit
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete
              </Button>
            </Stack>
          </Stack>

          <Tabs
            value={tab}
            onChange={(e, value) => setTab(value)}
            sx={{ mb: 3 }}
          >
            <Tab label="Overview" />
            <Tab label="Financial" />
            <Tab label="Utilities" />
            <Tab label="Notes" />
          </Tabs>

          {tab === 0 && (
            <Stack spacing={2}>
              <Typography>
                <strong>Property Type:</strong> {property.property_type}
              </Typography>

              <Typography>
                <strong>Bedrooms:</strong> {property.bedrooms}
              </Typography>

              <Typography>
                <strong>Bathrooms:</strong> {property.bathrooms}
              </Typography>

              <Typography>
                <strong>Square Feet:</strong> {property.square_feet}
              </Typography>

              <Typography>
                <strong>Year Built:</strong> {property.year_built}
              </Typography>
            </Stack>
          )}

          {tab === 1 && (
            <Stack spacing={2}>
              <Typography>
                <strong>Purchase Price:</strong> ${property.purchase_price}
              </Typography>

              <Typography>
                <strong>Monthly Rent:</strong> ${property.monthly_rent}
              </Typography>

              <Typography>
                <strong>Purchase Date:</strong> {property.purchase_date}
              </Typography>
            </Stack>
          )}

          {tab === 2 && (
            <Stack spacing={2}>
              <Typography>
                <strong>Electric:</strong> {property.electric_paid_by}
              </Typography>

              <Typography>
                <strong>Water:</strong> {property.water_paid_by}
              </Typography>

              <Typography>
                <strong>Gas:</strong> {property.gas_paid_by}
              </Typography>

              <Typography>
                <strong>Trash:</strong> {property.trash_paid_by}
              </Typography>
            </Stack>
          )}

          {tab === 3 && (
            <Typography>{property.notes || "No notes provided."}</Typography>
          )}
        </CardContent>
      </Card>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Are you sure?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Deleting the property is permanent.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>

          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
