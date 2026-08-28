import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

const initialFormData = {
  amount: "",
  category: "",
  expense_date: "",
  note: "",
};

const categories = [
  "Maintenance",
  "Tax",
  "Enhancement",
  "Utility",
  "Insurance",
  "Other",
];

export default function ExpenseForm({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState(initialFormData);
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

    if (formData.amount === "" || formData.amount === null) {
      newErrors.amount = "Amount is required.";
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    if (!formData.expense_date) {
      newErrors.expense_date = "Expense date is required.";
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

    onSubmit({
      amount: Number(formData.amount),
      category: formData.category || null,
      expense_date: formData.expense_date,
      note: formData.note || null,
    });

    setFormData(initialFormData);
    setErrors({});
  }

  function handleClose() {
    setFormData(initialFormData);
    setErrors({});
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      disableRestoreFocus
    >
      <Stack component="form" onSubmit={handleSubmit} noValidate>
        <DialogTitle sx={{ pb: 0.5 }}>Add Expense</DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Record an expense paid for this property.
          </DialogContentText>

          <Stack spacing={2.5}>
            <TextField
              fullWidth
              required
              type="number"
              label="Amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              error={Boolean(errors.amount)}
              helperText={errors.amount}
              slotProps={{
                htmlInput: {
                  min: 0.01,
                  step: 0.01,
                },
              }}
            />

            <TextField
              fullWidth
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value="">None</MenuItem>

              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              required
              type="date"
              label="Expense Date"
              name="expense_date"
              value={formData.expense_date}
              onChange={handleChange}
              error={Boolean(errors.expense_date)}
              helperText={errors.expense_date}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              helperText="Optional"
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, pt: 1.5 }}>
          <Button onClick={handleClose}>Cancel</Button>

          <Button type="submit" variant="contained">
            Add Expense
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
