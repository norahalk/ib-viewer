import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography,
  TextField,
  TableHead,
} from "@mui/material";

const SearchResultPackages = () => {
  const location = useLocation();
  const { packages, architecture } = location.state; // Retrieve the packages and architecture from the state

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const packagesArray = Object.entries(packages); // Convert packages object to array

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setPage(0);
  };

  const filteredPackages = packagesArray.filter(([packageName]) =>
    packageName.toLowerCase().includes(searchQuery)
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Packages used in <strong>{architecture}</strong>
      </Typography>
      <TextField
        label="Search Packages"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: "20px" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Package Name</strong>
              </TableCell>
              <TableCell>
                <strong>Version</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPackages
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(([packageName, packageVersion], index) => (
                <TableRow
                  key={packageName}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  <TableCell>
                    <Link to={`/${packageName}/packageDetails`}>
                      {" "}
                      {packageName}
                    </Link>
                  </TableCell>
                  <TableCell>{packageVersion}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredPackages.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </Box>
  );
};

export default SearchResultPackages;
