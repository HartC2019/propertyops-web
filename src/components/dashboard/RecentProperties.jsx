import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
        <Typography variant="h5">Recent Properties</Typography>

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
          gap: 2,
        }}
      >
        {visibleProperties.map((property) => (
          <Card key={property.id}>
            <CardMedia
              component="img"
              height="180"
              image={property.cover_image_url}
              alt={property.nickname}
            />

            <CardContent>
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="h6">{property.nickname}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {property.city}, {property.state}
                  </Typography>
                </Box>

                <Typography variant="h6">
                  ${Number(property.monthly_rent).toFixed(2)}/mo
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
