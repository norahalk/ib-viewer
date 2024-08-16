import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Container,
  TableHead,
  TablePagination,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation
import { DataContext } from "../../contexts/DataContext";

const IBList = () => {
  const { ibs } = useContext(DataContext); // Get IBs data from context
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState(""); // State for filter input
  
  const navigate = useNavigate(); // Initialize navigation hook

  // Flatten IBs data into a single array of rows
  const rows = Object.values(ibs).map((ib) => ({
    version: ib.version,
    date: ib.date.split("T")[0],
    flavor: ib.flavor,
    architecture: ib.architecture,
    packages: ib.packages,
  }));

  // Filter rows by IB Name
  const filteredRows = rows.filter((row) =>
    `${row.version}-${row.flavor}-${row.date}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  // Handle "Show Packages" button click
  const handleShowPackages = (ib) => {
    navigate(`/ib/${ib.version}/${ib.architecture}/packages`, {
      state: { ib },
    });
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  // Sort filtered rows by version in descending order (newest first)
  const sortedRows = filteredRows.sort((a, b) => {
    return b.version.localeCompare(a.version, { numeric: true });
  });

  const paginatedRows = sortedRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1); // TablePagination uses 0-based indexing
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to the first page
  };

  // Handle filter input change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Container>
      <Box sx={{ marginBottom: "20px" }}>
        <TextField
          label="Filter by IB Name"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={handleFilterChange}
          placeholder="Enter IB Name"
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  textAlign: "center",
                }}
              >
                IB Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  textAlign: "center",
                }}
              >
                Architecture
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  textAlign: "center",
                }}
              >
                Packages
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow
                key={`${row.version}-${row.date}-${row.flavor}-${row.architecture}`}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                }}
              >
                <TableCell align="center">
                  {row.version}_{row.flavor}_X_{row.date}
                </TableCell>
                <TableCell align="center">
                  {row.architecture}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#1e59ae", marginLeft: "10px" }}
                    onClick={() => handleShowPackages(row)}
                  >
                    Show Packages
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]} // Options for rows per page
          component="div"
          count={filteredRows.length} // Total number of rows after filtering
          rowsPerPage={rowsPerPage}
          page={page - 1} // Adjust for 0-based index
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default IBList;
