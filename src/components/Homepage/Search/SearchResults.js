import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  Button,
} from "@mui/material";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook to programmatically navigate
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

  const handleShowPackages = (result) => {
    navigate(`/search/${result.release_name}/${result.architecture}/packages`, {
      state: { data: result },
    });
  };

  const currentRows = results.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      {results.length === 0 ? (
        <Typography variant="h5" gutterBottom sx={{ margin: "20px" }}>
          No {index} are found that use <strong>{query}</strong>
        </Typography>
      ) : (
        <>
          {index === "IBs" ? (
            <Box sx={{ margin: "20px" }}>
              <Typography variant="h5" gutterBottom>
                {index} that are using <strong>{query}</strong>
              </Typography>

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
                        Version
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          textAlign: "center",
                        }}
                      >
                        Flavor
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          textAlign: "center",
                        }}
                      >
                        Date
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
                    {currentRows.map((result, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                        }}
                      >
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {result.version}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {result.flavor}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {result.date}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {result.architecture}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleShowPackages(result)}
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
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                      >
                        Release Cycle
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                      >
                        Flavor
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                      >
                        Architecture
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                      >
                        Packages
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentRows.map((result, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                        }}
                      >
                        <TableCell>{result.release_cycle}</TableCell>
                        <TableCell>{result.flavor}</TableCell>
                        <TableCell>{result.architecture}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              handleShowPackages(
                                result
                              )
                            }
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
                count={results.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Box>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
