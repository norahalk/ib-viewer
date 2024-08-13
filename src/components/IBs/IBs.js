import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Pagination,
  Container,
  Box,
} from "@mui/material";
import { DataContext } from "../../contexts/DataContext";

const IBs = () => {
  const { ibs } = useContext(DataContext); // Get IBs data from context
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Group IBs by version
  const groupedByVersion = Object.values(ibs).reduce((acc, ib) => {
    if (!acc[ib.version]) {
      acc[ib.version] = [];
    }
    acc[ib.version].push(ib);
    return acc;
  }, {});

  const versionKeys = Object.keys(groupedByVersion).reverse();
  const paginatedKeys = versionKeys.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ width: "100%" }}>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TableContainer component={Paper} style={{ maxWidth: "800px" }}>
          <Table>
            <TableBody>
              {paginatedKeys.map((version, index) => (
                <TableRow
                  key={version}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  <TableCell align="center">
                    {/* Link to the dates page for this version */}
                    <Link to={`/${version}/dates`}>{version}</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {versionKeys.length > rowsPerPage && (
          <Pagination
            count={Math.ceil(versionKeys.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            style={{ marginTop: "20px" }}
          />
        )}
      </Container>
    </Box>
  );
};

export default IBs;
