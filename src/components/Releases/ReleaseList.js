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
  Box,
  Button,
  TextField,
} from "@mui/material";
import { DataContext } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";

// Helper function to parse release cycle from release name
const parseReleaseCycle = (releaseName) => {
  const match = releaseName.match(/CMSSW_(\d+)_(\d+)(?:_(\d+))?/);
  if (match) {
    const [, major, minor, patch] = match;
    return [parseInt(major), parseInt(minor), parseInt(patch) || 0];
  }
  return [0, 0, 0]; // Default if parsing fails
};

// Function to compare two release cycles
const compareReleaseCycles = (a, b) => {
  const [aMajor, aMinor, aPatch] = parseReleaseCycle(a.release_name);
  const [bMajor, bMinor, bPatch] = parseReleaseCycle(b.release_name);
  if (aMajor !== bMajor) return bMajor - aMajor; // Descending order
  if (aMinor !== bMinor) return bMinor - aMinor; // Descending order
  return bPatch - aPatch; // Descending order
};

function ReleaseList() {
  const { releases } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState(""); // State for filter input

  const navigate = useNavigate();

  // Handle change in page number
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle "Show Packages" button click
  const handleShowPackages = (release) => {
    navigate(`/release/${release.architecture}/packages`, {
      state: {packages: release.packages},
    });
    window.scrollTo(0, 0);
  };

  // Filter releases based on filter input
  const filteredReleases = releases.filter((release) =>
    release.release_name.toLowerCase().includes(filter.toLowerCase())
  );

  // Sort filtered releases by release cycle
  const sortedReleases = filteredReleases.sort(compareReleaseCycles);

  return (
    <div>
      <Box mb={2} p={2}>
        <TextField
          label="Filter by Release Name"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
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
                Release Name
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
