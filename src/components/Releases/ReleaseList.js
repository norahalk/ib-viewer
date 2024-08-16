import React, { useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
  TableHead,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { DataContext } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation

// Helper function to compare release versions
const compareReleaseVersions = (a, b) => {
  const parseVersion = (version) => version.split("_").slice(1).map(Number);

  const [majorA, minorA, patchA] = parseVersion(a.release_cycle);
  const [majorB, minorB, patchB] = parseVersion(b.release_cycle);

  if (majorA !== majorB) return majorB - majorA;
  if (minorA !== minorB) return minorB - minorA;
  return patchB - patchA;
};

function ReleaseList() {
  const { releases } = useContext(DataContext); // Get releases data from context
  const [page, setPage] = useState(0); // State to track the current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // State to track rows per page
  const [filter, setFilter] = useState(""); // State for filter input

  const navigate = useNavigate(); // Initialize navigation hook

  // Filter releases by release_cycle
  const filteredReleases = releases.filter((release) =>
    release.release_cycle.toLowerCase().includes(filter.toLowerCase())
  );

  // Sort filtered releases by release_cycle in reverse chronological order
  const sortedReleases = [...filteredReleases].sort(compareReleaseVersions);

  // Handle change in page number
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle filter input change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Handle "Show Packages" button click
  const handleShowPackages = (release) => {
    navigate(`/release/${release.architecture}/packages`, {
      state: { release },
    });
    window.scrollTo(0, 0); // Scroll to the top of the page

  };

  return (
    <div>
      <Box sx={{ marginBottom: "20px" }}>
        <TextField
          label="Filter by Release Cycle"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={handleFilterChange}
          placeholder="Enter Release Cycle"
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
                Release Cycle
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
            {sortedReleases
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((release) => (
                <TableRow key={release.release_name}>
                  <TableCell align="center">{release.release_name}</TableCell>
                  <TableCell align="center">{release.architecture}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#1e59ae", marginLeft: "10px" }}
                      onClick={() => handleShowPackages(release)}
                    >
                      Show Packages
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={sortedReleases.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
}

export default ReleaseList;
