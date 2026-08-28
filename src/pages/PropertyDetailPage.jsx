import { useEffect, useRef, useState } from "react";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

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
import { formatDate } from "../utils/formatDate";
import { deleteProperty, getProperty } from "../api/properties";
import { createIncome, deleteIncome, getIncome } from "../api/income";
import IncomeTable from "../components/income/IncomeTable";
import IncomeForm from "../components/income/IncomeForm";
import { createExpense, deleteExpense, getExpenses } from "../api/expenses";
import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseForm from "../components/expenses/ExpenseForm";
import { getPropertyImage } from "../utils/propertyImages";

export default function PropertyDetailPage() {
  const { propertyId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [income, setIncome] = useState([]);
  const [tab, setTab] = useState(0);

  const [loading, setLoading] = useState(true);
  const [incomeLoading, setIncomeLoading] = useState(false);

  const [error, setError] = useState("");
  const [incomeError, setIncomeError] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [incomeDeleteDialogOpen, setIncomeDeleteDialogOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);

  const [incomeFormOpen, setIncomeFormOpen] = useState(false);

  const [expenses, setExpenses] = useState([]);
  const [expenseLoading, setExpenseLoading] = useState(false);
  const [expenseError, setExpenseError] = useState("");

  const [expenseDeleteDialogOpen, setExpenseDeleteDialogOpen] = useState(false);

  const [selectedExpense, setSelectedExpense] = useState(null);

  const [expenseFormOpen, setExpenseFormOpen] = useState(false);

  const tabContentRef = useRef(null);

  const location = useLocation();

  const backToDashboard = location.state?.from === "dashboard";

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

  useEffect(() => {
    async function loadIncome() {
      setIncomeLoading(true);
      setIncomeError("");

      try {
        const data = await getIncome(propertyId, token);
        setIncome(data);
      } catch (err) {
        setIncomeError(err.message);
      } finally {
        setIncomeLoading(false);
      }
    }

    loadIncome();
  }, [propertyId, token]);

  useEffect(() => {
    async function loadExpenses() {
      setExpenseLoading(true);
      setExpenseError("");

      try {
        const data = await getExpenses(propertyId, token);
        setExpenses(data);
      } catch (err) {
        setExpenseError(err.message);
      } finally {
        setExpenseLoading(false);
      }
    }

    loadExpenses();
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

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  async function handleCreateIncome(incomeData) {
    const createdIncome = await createIncome(
      {
        ...incomeData,
        property_id: Number(propertyId),
      },
      token,
    );

    setIncome((currentIncome) =>
      [createdIncome, ...currentIncome].sort(
        (a, b) => new Date(b.payment_date) - new Date(a.payment_date),
      ),
    );

    setIncomeFormOpen(false);
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

  function handleDeleteIncomeClick(record) {
    setSelectedIncome(record);
    setIncomeDeleteDialogOpen(true);
  }

  async function handleDeleteIncome() {
    try {
      await deleteIncome(selectedIncome.id, token);

      setIncome((currentIncome) =>
        currentIncome.filter((record) => record.id !== selectedIncome.id),
      );

      setIncomeDeleteDialogOpen(false);
      setSelectedIncome(null);
    } catch (err) {
      setIncomeError(err.message || "Unable to delete income.");
    }
  }

  async function handleCreateExpense(expenseData) {
    const createdExpense = await createExpense(
      {
        ...expenseData,
        property_id: Number(propertyId),
      },
      token,
    );

    setExpenses((currentExpenses) =>
      [createdExpense, ...currentExpenses].sort(
        (a, b) => new Date(b.expense_date) - new Date(a.expense_date),
      ),
    );

    setExpenseFormOpen(false);
  }

  function handleDeleteExpenseClick(expense) {
    setSelectedExpense(expense);
    setExpenseDeleteDialogOpen(true);
  }

  async function handleDeleteExpense() {
    try {
      await deleteExpense(selectedExpense.id, token);

      setExpenses((currentExpenses) =>
        currentExpenses.filter((expense) => expense.id !== selectedExpense.id),
      );

      setExpenseDeleteDialogOpen(false);
      setSelectedExpense(null);
    } catch (err) {
      setExpenseError(err.message || "Unable to delete expense.");
    }
  }

  function handleTabChange(event, value) {
    setTab(value);

    setTimeout(() => {
      tabContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        component={RouterLink}
        to={backToDashboard ? "/" : "/properties"}
        sx={{ mb: 3 }}
      >
        ← Back to {backToDashboard ? "Dashboard" : "Properties"}
      </Button>

      <Card>
        <CardMedia
          component="img"
          height="320"
          image={getPropertyImage(property.cover_image_url)}
          alt={property.nickname}
          sx={{ objectFit: "cover" }}
        />

        <CardContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "minmax(0, 1fr) auto",
              },
              gap: 2,
              alignItems: "start",
              width: "100%",
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h4">{property.nickname}</Typography>

              <Typography color="text.secondary">{property.street}</Typography>

              <Typography color="text.secondary">
                {property.city}, {property.state} {property.zip_code}
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                justifySelf: { xs: "end", sm: "end" },
              }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete
              </Button>

              <Button
                variant="contained"
                component={RouterLink}
                to={`/properties/${property.id}/edit`}
              >
                Edit
              </Button>
            </Stack>
          </Box>

          <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Overview" />
            <Tab label="Financial" />
            <Tab label="Income" />
            <Tab label="Expenses" />
            <Tab label="Utilities" />
            <Tab label="Notes" />
          </Tabs>

          <Box ref={tabContentRef}>
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
                  <strong>Purchase Date:</strong>{" "}
                  {formatDate(property.purchase_date)}
                </Typography>
              </Stack>
            )}

            {tab === 2 && (
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5">Income</Typography>

                  <Button
                    variant="contained"
                    onClick={() => {
                      setIncomeFormOpen(true);
                    }}
                    sx={{ ml: "auto", flexShrink: 0 }}
                  >
                    Add Income
                  </Button>
                </Stack>

                {incomeLoading && (
                  <Stack spacing={2} alignItems="center" sx={{ py: 4 }}>
                    <CircularProgress />
                    <Typography>Loading income...</Typography>
                  </Stack>
                )}

                {incomeError && <Alert severity="error">{incomeError}</Alert>}

                {!incomeLoading && !incomeError && income.length === 0 && (
                  <Alert severity="info">
                    No income recorded for this property.
                  </Alert>
                )}

                {!incomeLoading && !incomeError && income.length > 0 && (
                  <IncomeTable
                    income={income}
                    onDelete={handleDeleteIncomeClick}
                  />
                )}
              </Stack>
            )}

            {tab === 3 && (
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5">Expenses</Typography>

                  <Button
                    variant="contained"
                    onClick={() => setExpenseFormOpen(true)}
                    sx={{ ml: "auto", flexShrink: 0 }}
                  >
                    Add Expense
                  </Button>
                </Stack>

                {expenseLoading && (
                  <Stack spacing={2} alignItems="center" sx={{ py: 4 }}>
                    <CircularProgress />
                    <Typography>Loading expenses...</Typography>
                  </Stack>
                )}

                {expenseError && <Alert severity="error">{expenseError}</Alert>}

                {!expenseLoading && !expenseError && expenses.length === 0 && (
                  <Alert severity="info">
                    No expenses recorded for this property.
                  </Alert>
                )}

                {!expenseLoading && !expenseError && expenses.length > 0 && (
                  <ExpenseTable
                    expenses={expenses}
                    onDelete={handleDeleteExpenseClick}
                  />
                )}
              </Stack>
            )}

            {tab === 4 && (
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

            {tab === 5 && (
              <Typography>{property.notes || "No notes provided."}</Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete property?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this property? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>

          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <IncomeForm
        open={incomeFormOpen}
        onClose={() => setIncomeFormOpen(false)}
        onSubmit={handleCreateIncome}
      />

      <ExpenseForm
        open={expenseFormOpen}
        onClose={() => setExpenseFormOpen(false)}
        onSubmit={handleCreateExpense}
      />

      <Dialog
        open={incomeDeleteDialogOpen}
        onClose={() => setIncomeDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete income?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this income record? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIncomeDeleteDialogOpen(false)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteIncome}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={expenseDeleteDialogOpen}
        onClose={() => setExpenseDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete expense?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this expense record? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setExpenseDeleteDialogOpen(false)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteExpense}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
