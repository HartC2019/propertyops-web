import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { getPropertyImage } from "../../utils/propertyImages";

const CARDS_PER_PAGE = 3;

export default function RecentProperties({ properties }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(properties.length / CARDS_PER_PAGE);
  const startIndex = page * CARDS_PER_PAGE;
  const visibleProperties = properties.slice(
    startIndex,
    startIndex + CARDS_PER_PAGE,
  );

  function handlePrevious() {
    setPage((currentPage) => Math.max(currentPage - 1, 0));
  }

  function handleNext() {
    setPage((currentPage) => Math.min(currentPage + 1, pageCount - 1));
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5">Recent Properties</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Your most recently added rentals.
          </Typography>
        </Box>

        {pageCount > 1 && (
          <Stack direction="row">
            <IconButton
              onClick={handlePrevious}
              disabled={page === 0}
              aria-label="Previous properties"
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={handleNext}
              disabled={page === pageCount - 1}
              aria-label="Next properties"
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {visibleProperties.map((property) => (
          <Card
            key={property.id}
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
              <Stack spacing={1.5} sx={{ height: "100%" }}>
                <Box>
                  <Typography variant="h6">{property.nickname}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {property.city}, {property.state}
                  </Typography>
                </Box>

                <Typography variant="h6" sx={{ mt: "auto" }}>
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

                <Chip
                  label="Rented"
                  color="success"
                  size="small"
                  sx={{ width: "fit-content" }}
                />

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() =>
                    navigate(`/properties/${property.id}`, {
                      state: { from: "dashboard" },
                    })
                  }
                >
                  View Property
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Stack>
  );
}
