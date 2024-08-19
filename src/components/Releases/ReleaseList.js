import React, { useState, useContext, useEffect } from "react";
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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { DataContext } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";

function ReleaseList() {
  const { releases } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("");
  const [selectedArchitectures, setSelectedArchitectures] = useState([]); // State for selected architectures

  const navigate = useNavigate();

  // Reset page to 0 whenever the filter changes
  useEffect(() => {
    setPage(0);
  }, [filter]);

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
      state: { type: "Releases", data: release },
    });
    window.scrollTo(0, 0);
  };

  // Filter releases based on filter input and selected architectures
  const filteredReleases = releases
    .filter((release) =>
      release.release_name.toLowerCase().includes(filter.toLowerCase())
    )
    .filter(
      (release) =>
        selectedArchitectures.length === 0 ||
        selectedArchitectures.includes(release.architecture)
    );

  // Handle architecture filter change
  const handleArchitectureChange = (event) => {
    const value = event.target.value;
    setSelectedArchitectures(value);
  };

  // Get unique architectures for the filter menu
  const architectures = [
    ...new Set(releases.map((release) => release.architecture)),
  ];

  return (
    <div>
      <Box mb={2} p={2} display="flex" alignItems="center">
        <TextField
          label="Filter by Release Name"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <FormControl sx={{ marginLeft: 2, minWidth: 200 }}>
          <InputLabel>Architectures</InputLabel>
          <Select
            multiple
            value={selectedArchitectures}
            onChange={handleArchitectureChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {architectures.map((architecture) => (
              <MenuItem key={architecture} value={architecture}>
                <Checkbox
                  checked={selectedArchitectures.includes(architecture)}
                />
                <ListItemText primary={architecture} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            {filteredReleases
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
        count={filteredReleases.length}
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
