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
  payment_date: "",
  note: "",
};

const categories = ["Rent", "Late Fee", "Security Deposit", "Other"];

export default function IncomeForm({ open, onClose, onSubmit }) {
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

    if (formData.amount === "" || formData.amount === null) {
      newErrors.amount = "Amount is required.";
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    if (!formData.payment_date) {
      newErrors.payment_date = "Payment date is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
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

    try {
      await onSubmit({
        amount: Number(formData.amount),
        category: formData.category || null,
        payment_date: formData.payment_date,
        note: formData.note || null,
      });

      setFormData(initialFormData);
      setErrors({});
    } catch (err) {
      console.error(err);
    }
  }

  function handleClose() {
    setFormData(initialFormData);
    setErrors({});
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Stack component="form" onSubmit={handleSubmit} noValidate>
        <DialogTitle>Add Income</DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ pt: 1 }}>
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
              error={Boolean(errors.category)}
              helperText={errors.category}
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
              label="Payment Date"
              name="payment_date"
              value={formData.payment_date}
              onChange={handleChange}
              error={Boolean(errors.payment_date)}
              helperText={errors.payment_date}
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
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button type="submit" variant="contained">
            Add Income
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
