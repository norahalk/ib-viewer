import React, { useContext, useState, useMemo } from "react";
import axios from "axios";
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
  TablePagination
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const CompareIBsAndReleases = () => {
  const { ibs, releases } = useContext(DataContext);

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
  const [packageFilterText, setPackageFilterText] = useState(""); // New filter text state
  const [showTable, setShowTable] = useState(false);
  const [packageData1, setPackageData1] = useState({});
  const [packageData2, setPackageData2] = useState({});
  const [currentPage, setCurrentPage] = useState(0); // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows per page

  // Calculate the data to display on the current page
  const paginatedData = useMemo(() => {
    const allPackageNames = Object.keys({ ...packageData1, ...packageData2 });
    const filteredPackages = allPackageNames.filter(pkg =>
      containsText(pkg, packageFilterText) // Filter packages based on the package filter text
    );
    return filteredPackages.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage
    );
  }, [packageData1, packageData2, currentPage, rowsPerPage, packageFilterText]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

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
      const regex = /^IB: CMSSW_(\d+_\d+)_([A-Z0-9]+)_(\d{4}-\d{2}-\d{2}-\d{4})_([a-z0-9_]+)$/;
      const match = selectedOption.match(regex);
      console.log("Matched IB data:", match);

      if (match) {
        const version = `CMSSW_${match[1]}`;
        const flavor = match[2];
        const date = match[3];
        const architecture = match[4];

        try {
          const response = await axios.post("/api/searchIBsPackages", {
            version,
            date,
            flavor,
            architecture,
          });

          return response.data;
        } catch (error) {
          console.error("Error fetching package data:", error);
          return {};
        }
      }
    } else if (selectedOption.includes("Release")) {
      const regex = /^Release: (.+)$/;
      const match = selectedOption.match(regex);

      if (match) {
        const releaseName = match[1];

        try {
          const response = await axios.post("/api/searchReleasesPackages", {
            release_name: releaseName,
          });

          return response.data;
        } catch (error) {
          console.error("Error fetching release package data:", error);
          return {};
        }
      }
    }

    return {};
  };

  const handleCompare = async () => {
    try {
      const [data1, data2] = await Promise.all([
        fetchPackageData(selectedOption1),
        fetchPackageData(selectedOption2),
      ]);
  
      if (data1 && data2) {
        setPackageData1(data1);
        setPackageData2(data2);
        setShowTable(true);
      } else {
        console.error("One of the data sets is null:", { data1, data2 });
      }
    } catch (error) {
      console.error("Error comparing data:", error);
    }
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
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            placeholder="Filter Packages"
            value={packageFilterText}
            onChange={(e) => setPackageFilterText(e.target.value)} // Update filter text
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <TableContainer component={Paper} sx={{ mt: 2 }}>
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
                {paginatedData.map((pkg, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: "center" }}>{pkg}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {packageData1[pkg]}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {packageData2[pkg] || "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Pagination Controls */}
            <TablePagination
              component="div"
              count={Object.keys({ ...packageData1, ...packageData2 }).filter(pkg => containsText(pkg, packageFilterText)).length} // Filter count for pagination
              page={currentPage}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default CompareIBsAndReleases;
