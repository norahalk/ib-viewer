import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Typography,
} from "@mui/material";

const IBList = () => {
  const [ibData, setIbData] = useState({});
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    axios
      .get("/api/api/folders")
      .then((response) => setIbData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayedRows = Object.keys(ibData).slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        CMSSW Integration Builds
      </Typography>
      <TableContainer component={Paper} style={{ maxWidth: "800px" }}>
        <Table>
          <TableBody>
            {displayedRows.map((ib, index) => (
              <TableRow
                key={ib}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                }}
              >
                <TableCell align="center">
                  <Link to={`/dates/${ib}`}>{ib}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {Object.keys(ibData).length > rowsPerPage && (
        <Pagination
          count={Math.ceil(Object.keys(ibData).length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          style={{ marginTop: "20px" }}
        />
      )}
    </Container>
  );
};

export default IBList;
