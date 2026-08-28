import { useMemo, useState } from "react";

import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { formatDate } from "../../utils/formatDate";

const columns = [
  { id: "payment_date", label: "Date" },
  { id: "category", label: "Category" },
  { id: "amount", label: "Amount" },
  { id: "note", label: "Note" },
];

function descendingComparator(a, b, orderBy) {
  if (orderBy === "amount") {
    return Number(b.amount) - Number(a.amount);
  }

  if (orderBy === "payment_date") {
    return new Date(b.payment_date) - new Date(a.payment_date);
  }

  const valueA = String(a[orderBy] || "").toLowerCase();
  const valueB = String(b[orderBy] || "").toLowerCase();

  if (valueB < valueA) {
    return -1;
  }

  if (valueB > valueA) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  if (order === "desc") {
    return (a, b) => descendingComparator(a, b, orderBy);
  }

  return (a, b) => -descendingComparator(a, b, orderBy);
}

export default function IncomeTable({ income, onDelete }) {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("payment_date");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalIncome = income.reduce(
    (total, record) => total + Number(record.amount),
    0,
  );

  const sortedIncome = useMemo(() => {
    return [...income].sort(getComparator(order, orderBy));
  }, [income, order, orderBy]);

  const paginatedIncome = sortedIncome.slice(
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
        Total Income: ${totalIncome.toFixed(2)}
      </Typography>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "action.hover" }}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}

              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedIncome.map((record) => (
              <TableRow
                key={record.id}
                hover
                sx={{ "&:last-child td": { borderBottom: 0 } }}
              >
                <TableCell>{formatDate(record.payment_date)}</TableCell>
                <TableCell>{record.category || "—"}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  ${Number(record.amount).toFixed(2)}
                </TableCell>

                <TableCell sx={{ maxWidth: 250 }}>
                  {record.note ? (
                    <Tooltip title={record.note} arrow>
                      <Typography noWrap color="text.secondary">
                        {record.note}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography color="text.secondary">—</Typography>
                  )}
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="Delete income">
                    <IconButton
                      color="error"
                      onClick={() => onDelete(record)}
                      aria-label={`Delete income record ${record.id}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                count={income.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={5}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
