import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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

export default function ExpenseForm({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  }

  function validateForm() {
    const newErrors = {};

    if (formData.amount === "") {
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
      return;
    }

    onSubmit(formData);
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
      <DialogTitle>Add Expense</DialogTitle>

      <DialogContent>
        <Stack
          component="form"
          id="expense-form"
          spacing={2}
          sx={{ pt: 1 }}
          onSubmit={handleSubmit}
          noValidate
        >
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
                min: 0,
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
            error={Boolean(errors.category)}
            helperText={errors.category}
          >
            <MenuItem value="Maintenance">Maintenance</MenuItem>
            <MenuItem value="Tax">Tax</MenuItem>
            <MenuItem value="Enhancement">Enhancement</MenuItem>
            <MenuItem value="Utility">Utility</MenuItem>
            <MenuItem value="Insurance">Insurance</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
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

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button type="submit" form="expense-form" variant="contained">
          Add Expense
        </Button>
      </DialogActions>
    </Dialog>
  );
}
