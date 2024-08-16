import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";

const SearchResults = () => {
  const location = useLocation();
  const { results, query, index } = location.state;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentRows = results.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      {index === "IBs" ? (
        <Box sx={{ margin: "20px" }}>
          <Typography variant="h5" gutterBottom>
            {index} that are using <strong>{query}</strong>
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Version
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Flavor
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Architecture
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.map((result, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    }}
                  >
                    <TableCell>{result.version}</TableCell>
                    <TableCell>{result.flavor}</TableCell>
                    <TableCell>{result.date}</TableCell>
                    <TableCell>
                      <Link
                        to={`/search/${result.version}/${result.architecture}/packages`}
                        state={{
                          packages: result.packages,
                          architecture: result.architecture,
                        }}
                      >
                        {result.architecture}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={results.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      ) : (
        <Box sx={{ margin: "20px" }}>
          <Typography variant="h5" gutterBottom>
            {index} that are using <strong>{query}</strong>
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Release Cycle
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Flavor
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Architecture
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.map((result, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    }}
                  >
                    <TableCell>{result.release_cycle}</TableCell>
                    <TableCell>{result.flavor}</TableCell>
                    <TableCell>
                      <Link
                        to={`/search/${result.version}/${result.architecture}/packages`}
                        state={{
                          packages: result.packages,
                          architecture: result.architecture,
                        }}
                      >
                        {result.architecture}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={results.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      )}
    </div>
  );
};

export default SearchResults;
