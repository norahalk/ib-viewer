import React, { useContext, useState, useMemo } from "react";
import axios from "axios"; // Import axios for making HTTP requests
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
  const allOptions = useMemo(
    () => [
      ...ibs.map(
        (ib) => `IB: ${ib.version}_${ib.flavor}_${ib.date}_${ib.architecture}`
      ),
      ...releases.map((release) => `Release: ${release.release_name}`),
    ],
    [ibs, releases]
  );

  const [selectedOption1, setSelectedOption1] = useState(allOptions[0]);
  const [selectedOption2, setSelectedOption2] = useState(allOptions[1]);
  const [searchText1, setSearchText1] = useState("");
  const [searchText2, setSearchText2] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [packageData1, setPackageData1] = useState([]);
  const [packageData2, setPackageData2] = useState([]);

  const displayedOptions1 = useMemo(
    () => allOptions.filter((option) => containsText(option, searchText1)),
    [searchText1, allOptions]
  );

  const displayedOptions2 = useMemo(
    () => allOptions.filter((option) => containsText(option, searchText2)),
    [searchText2, allOptions]
  );

  const fetchPackageData = async (selectedOption) => {
    if (selectedOption.includes("IB")) {
      // Regular expression to match the IB pattern with architecture
      const regex = /^IB: CMSSW_(\d+_\d+)_([A-Z0-9]+)_X_(\d{4}-\d{2}-\d{2}-\d{4})_([a-z0-9_]+)$/;
      const match = selectedOption.match(regex);
      console.log("Matched IB data:", match);

      if (match) {
        const version = `CMSSW_${match[1]}`;
        const flavor = match[2];
        const date = match[3];
        const architecture = match[4];
  
        try {
          const response = await axios.post("/searchPackages", {
            version,
            date,
            flavor,
            architecture,
          });
  
          return response.data;
        } catch (error) {
          console.error("Error fetching package data:", error);
          return [];
        }
      }
    }
  
    return [];
  };
  
  const handleCompare = async () => {
    const data1 = await fetchPackageData(selectedOption1);
    const data2 = await fetchPackageData(selectedOption2);

    setPackageData1(data1);
    setPackageData2(data2);
    setShowTable(true);
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
        onClick={handleCompare}
      >
        Compare
      </Button>

      {showTable && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
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
                  Packages
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    textAlign: "center",
                  }}
                >
                  {selectedOption1}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    textAlign: "center",
                  }}
                >
                  {selectedOption2}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {packageData1.map((pkg1, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {pkg1.package_name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {pkg1.version}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {packageData2[index]?.version || "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CompareIBsAndReleases;
