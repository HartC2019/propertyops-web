import { useMemo, useState } from "react";

import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { formatDate } from "../../utils/formatDate";

export default function ExpenseTable({ expenses, onDelete }) {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("expense_date");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalExpenses = useMemo(() => {
    return expenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0,
    );
  }, [expenses]);

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => {
      let valueA = a[orderBy];
      let valueB = b[orderBy];

      if (orderBy === "amount") {
        valueA = Number(valueA);
        valueB = Number(valueB);
      }

      if (orderBy === "expense_date") {
        valueA = new Date(valueA);
        valueB = new Date(valueB);
      }

      if (valueA < valueB) {
        return order === "asc" ? -1 : 1;
      }

      if (valueA > valueB) {
        return order === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [expenses, order, orderBy]);

  const visibleExpenses = sortedExpenses.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  function handleSort(property) {
    const isAscending = orderBy === property && order === "asc";

    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
    setPage(0);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total Expenses: ${totalExpenses.toFixed(2)}
      </Typography>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "action.hover" }}>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "expense_date"}
                  direction={orderBy === "expense_date" ? order : "asc"}
                  onClick={() => handleSort("expense_date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "category"}
                  direction={orderBy === "category" ? order : "asc"}
                  onClick={() => handleSort("category")}
                >
                  Category
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "amount"}
                  direction={orderBy === "amount" ? order : "asc"}
                  onClick={() => handleSort("amount")}
                >
                  Amount
                </TableSortLabel>
              </TableCell>

              <TableCell>Note</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleExpenses.map((expense) => (
              <TableRow
                key={expense.id}
                hover
                sx={{ "&:last-child td": { borderBottom: 0 } }}
              >
                <TableCell>{formatDate(expense.expense_date)}</TableCell>
                <TableCell>{expense.category || "—"}</TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  ${Number(expense.amount).toFixed(2)}
                </TableCell>

                <TableCell sx={{ maxWidth: 250 }}>
                  {expense.note ? (
                    <Tooltip title={expense.note} arrow>
                      <Typography noWrap color="text.secondary">
                        {expense.note}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography color="text.secondary">—</Typography>
                  )}
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="Delete expense">
                    <IconButton
                      color="error"
                      onClick={() => onDelete(expense)}
                      aria-label={`Delete expense ${expense.id}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={sortedExpenses.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </Box>
  );
}
