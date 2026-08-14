import { Link as RouterLink } from "react-router-dom";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

export default function PropertyCard({ property }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="180"
        image={property.cover_image_url}
        alt={property.nickname}
      />

      <CardContent>
        <Typography variant="h6">{property.nickname}</Typography>

        <Typography color="text.secondary">{property.street}</Typography>

        <Typography color="text.secondary">
          {property.city}, {property.state} {property.zip_code}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Monthly Rent: ${property.monthly_rent}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          component={RouterLink}
          to={`/properties/${property.id}`}
          variant="contained"
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
