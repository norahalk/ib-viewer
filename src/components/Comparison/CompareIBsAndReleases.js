import React, { useState, useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import {
  Button,
  TextField,
  MenuItem,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";

const CompareIBsAndReleases = () => {
  const { ibs, releases } = useContext(DataContext);
  const [selectedIb, setSelectedIb] = useState("");
  const [selectedRelease, setSelectedRelease] = useState("");
  const [comparisonData, setComparisonData] = useState(null);

  const handleCompare = () => {
    if (selectedIb && selectedRelease) {
      const ibData = ibs.find((ib) => ib.version === selectedIb);
      const releaseData = releases.find(
        (release) => release.release_name === selectedRelease
      );

      if (ibData && releaseData) {
        setComparisonData({ ibData, releaseData });
      } else {
        console.error("No matching data found for IB or Release.");
        setComparisonData(null);
      }
    }
  };

  return (
    <div>
      <TextField
        select
        label="Choose an IB"
        value={selectedIb}
        onChange={(e) => setSelectedIb(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      >
        {ibs.length > 0 ? (
          ibs.map((ib) => (
            <MenuItem key={ib.version} value={ib.version}>
              {ib.version}_{ib.flavor}_{ib.date}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No IBs available</MenuItem>
        )}
      </TextField>

      <TextField
        select
        label="Choose a Release"
        value={selectedRelease}
        onChange={(e) => setSelectedRelease(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      >
        {releases.length > 0 ? (
          releases.map((release) => (
            <MenuItem key={release.release_name} value={release.release_name}>
              {release.release_name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No Releases available</MenuItem>
        )}
      </TextField>

      <Button
        variant="contained"
        style={{ backgroundColor: "#1e59ae", marginTop: "10px" }}
        onClick={handleCompare}
      >
        Compare
      </Button>

      {comparisonData && (
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={6}>
            <Box
              sx={{
                border: 1,
                borderColor: "grey.400",
                borderRadius: 2,
                padding: 2,
              }}
            >
              <h2>IB: {comparisonData.ibData.version}_{comparisonData.ibData.flavor}_{comparisonData.ibData.date}</h2>
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
                      >IB Name</TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          textAlign: "center",
                        }}
                      >Architecture</TableCell>
                      {/* <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  textAlign: "center",
                }}
              >Packages</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        {comparisonData.ibData.version}_{
                          comparisonData.ibData.flavor
                        }_X_{comparisonData.ibData.date.split("T")[0]}
                      </TableCell>
                      <TableCell align="center">
                        {comparisonData.ibData.architecture}
                      </TableCell>
                      <TableCell align="center">
                        {comparisonData.ibData.packages.length}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                border: 1,
                borderColor: "grey.400",
                borderRadius: 2,
                padding: 2,
              }}
            >
              <h2>Release: {comparisonData.releaseData.release_name}</h2>
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
                      >Release Name</TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          textAlign: "center",
                        }}
                      >Architecture</TableCell>
                      {/* <TableCell
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          textAlign: "center",
                        }}
                      >Packages</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        {comparisonData.releaseData.release_name}
                      </TableCell>
                      <TableCell align="center">
                        {comparisonData.releaseData.architecture}
                      </TableCell>
                      {/* <TableCell align="center">
                        {comparisonData.releaseData.packages.length}
                      </TableCell> */}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default CompareIBsAndReleases;
