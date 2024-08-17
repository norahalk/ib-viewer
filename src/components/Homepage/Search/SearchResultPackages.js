import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  Button,
} from "@mui/material";

const SearchResultPackages = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { version, flavor, date, architecture, packages } = location.state; // Retrieve the packages and architecture from the state

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

  // Filter packages based on search query and sort alphabetically
  const filteredPackages = packagesArray
    .filter(([packageName]) =>
      packageName.toLowerCase().includes(searchQuery)
    )
    .sort(([packageNameA], [packageNameB]) =>
      packageNameA.localeCompare(packageNameB)
    );

  // Handle "More Info" button click
  const handleMoreInfo = (packageName) => {
    navigate(`/${packageName}/packageDetails`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "50px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Packages Used In <strong>{version}_{flavor}_X_{date}</strong>
            <br/>
            Architecture: <strong>{architecture}</strong>
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
              <TableCell>
                <strong>Package Description</strong>
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
                  <TableCell>{packageName}</TableCell>
                  <TableCell>{packageVersion}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#1e59ae" }}
                      onClick={() => handleMoreInfo(packageName)}
                    >
                      More Info
                    </Button>
                  </TableCell>
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
