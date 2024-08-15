import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";

const SearchResults = () => {
  const location = useLocation();
  const { results, filter } = location.state || { results: [], filter: "" };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {filter} Results
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>
                  {/* Display result information */}
                  {filter === "IBs" ? result.ibName : result.releaseName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SearchResults;
