import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { getPropertyImage } from "../../utils/propertyImages";

export default function PropertyCard({ property }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={getPropertyImage(property.cover_image_url)}
        alt={property.nickname}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{property.nickname}</Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {property.street}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {property.city}, {property.state} {property.zip_code}
        </Typography>

        <Typography sx={{ mt: 2, fontWeight: 700 }}>
          ${Number(property.monthly_rent || 0).toFixed(2)}
          <Box
            component="span"
            sx={{
              color: "text.secondary",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            /mo
          </Box>
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center", p: 2, pt: 0 }}>
        <Button
          component={RouterLink}
          to={`/properties/${property.id}`}
          variant="contained"
          fullWidth
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
