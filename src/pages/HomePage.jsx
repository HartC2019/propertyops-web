import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useAuth } from "../auth/AuthContext";
import { getDashboard } from "../api/dashboard";
import RecentProperties from "../components/dashboard/RecentProperties";

function SummaryCard({ label, value, color = "text.primary" }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>

        <Typography variant="h4" sx={{ mt: 1, color }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const { token } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const data = await getDashboard(token);
        setDashboard(data);
      } catch (err) {
        setError(err.message || "Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [token]);

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography>Loading dashboard...</Typography>
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
          A quick view of your portfolio’s monthly performance.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard label="Properties" value={dashboard.propertyCount} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            label="Monthly Income"
            value={`$${Number(dashboard.monthlyIncome).toFixed(2)}`}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            label="Monthly Expenses"
            value={`$${Number(dashboard.monthlyExpenses).toFixed(2)}`}
            color="error.main"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            label="Monthly Net Income"
            value={`$${Number(dashboard.monthlyNetIncome).toFixed(2)}`}
            color="success.main"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <RecentProperties properties={dashboard.recentProperties} />
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h5">Reports</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
          Coming soon
        </Typography>
      </Box>
    </Container>
  );
}
