import React, { useContext, useState, useMemo } from "react";
import { DataContext } from "../../contexts/DataContext";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Function to filter options based on search text
const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const CompareIBsAndReleases = () => {
  const { ibs, releases } = useContext(DataContext);

  // Combine IBs and Releases into one array for the dropdowns
  const allOptions = useMemo(() => [
    ...ibs.map((ib) => `IB: ${ib.version}_${ib.flavor}_${ib.date}`),
    ...releases.map((release) => `Release: ${release.release_name}`),
  ], [ibs, releases]);

  const [selectedOption1, setSelectedOption1] = useState(allOptions[0]);
  const [selectedOption2, setSelectedOption2] = useState(allOptions[1]);
  const [searchText1, setSearchText1] = useState("");
  const [searchText2, setSearchText2] = useState("");
  const [showTable, setShowTable] = useState(false); // State to manage table visibility

  const displayedOptions1 = useMemo(
    () => allOptions.filter((option) => containsText(option, searchText1)),
    [searchText1, allOptions]
  );

  const displayedOptions2 = useMemo(
    () => allOptions.filter((option) => containsText(option, searchText2)),
    [searchText2, allOptions]
  );

  const handleCompare = () => {
    setShowTable(true); // Show the table when comparing
  };

  return (
    <Box sx={{ p: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="select-label-1">Select IB/Release</InputLabel>
        <Select
          MenuProps={{ autoFocus: false }}
          labelId="select-label-1"
          id="search-select-1"
          value={selectedOption1}
          label="Select IB/Release"
          onChange={(e) => setSelectedOption1(e.target.value)}
          onClose={() => setSearchText1("")}
          renderValue={() => selectedOption1}
        >
          <ListSubheader>
            <TextField
              size="small"
              autoFocus
              placeholder="Type to search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchText1(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {displayedOptions1.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="select-label-2">Select IB/Release</InputLabel>
        <Select
          MenuProps={{ autoFocus: false }}
          labelId="select-label-2"
          id="search-select-2"
          value={selectedOption2}
          label="Select IB/Release"
          onChange={(e) => setSelectedOption2(e.target.value)}
          onClose={() => setSearchText2("")}
          renderValue={() => selectedOption2}
        >
          <ListSubheader>
            <TextField
              size="small"
              autoFocus
              placeholder="Type to search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchText2(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {displayedOptions2.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        style={{ backgroundColor: "#1e59ae", marginTop: "10px" }}
        onClick={handleCompare} // Call handleCompare on button click
      >
        Compare
      </Button>

      {/* Render the comparison table if showTable is true */}
      {showTable && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  textAlign: "center",
                }}>Packages</TableCell>
                <TableCell sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  textAlign: "center",
                }}>{selectedOption1}</TableCell>
                <TableCell sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  textAlign: "center",
                }}>{selectedOption2}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                {selectedOption1.includes("Release") ? <TableCell sx={{
                  textAlign: "center",
                }}>release</TableCell> : <TableCell sx={{
                  textAlign: "center",
                }}>ib</TableCell>}

                {selectedOption1.includes("Release") ? <TableCell sx={{
                  textAlign: "center",
                }}>release</TableCell> : <TableCell sx={{
                  textAlign: "center",
                }}>ib</TableCell>}

                {selectedOption2.includes("Release") ? <TableCell sx={{
                  textAlign: "center",
                }}>release</TableCell> : <TableCell sx={{
                  textAlign: "center",
                }}>ib</TableCell>}
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CompareIBsAndReleases;
