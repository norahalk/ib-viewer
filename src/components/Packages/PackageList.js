import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
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

const Packages = ({ type }) => {
  const { ibs, releases } = useContext(DataContext);
  const { version, architecture } = useParams(); // Extract version and architecture from URL params

  // Determine whether to use IBs or Releases based on the `type` prop
  const data = type === "IB" ? ibs : releases;

  // Find the relevant IB or Release by version and architecture
  const item = Object.values(data).find(
    (item) => item.version === version && item.architecture === architecture
  );

  const [page, setPage] = useState(0); // Pagination state for current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // State for rows per page
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  if (!item) {
    return <div>No data found for this version and architecture</div>;
  }

  const packagesArray = Object.entries(item.packages); // Convert packages object to array

  // Handle change in page number
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  // Handle change in search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setPage(0); // Reset to first page
  };

  // Filter packages based on search query
  const filteredPackages = packagesArray.filter(([packageName]) =>
    packageName.toLowerCase().includes(searchQuery)
  );

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
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
              <TableCell><strong>Package Name</strong></TableCell>
              <TableCell><strong>Version</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPackages
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Pagination logic
              .map(([packageName, packageVersion], index) => (
                <TableRow
                  key={packageName}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  <TableCell>
                    <Link to={`/packageDetails/${packageName}`}>
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
          count={filteredPackages.length} // Total number of filtered packages
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
        />
      </TableContainer>
    </Box>
  );
};

export default Packages;
