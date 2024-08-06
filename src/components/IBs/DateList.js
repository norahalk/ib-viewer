import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
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
import { DataContext } from '../../contexts/DataContext';

const DateList = () => {
  const { ib } = useParams();
  const data = useContext(DataContext);
  const dates = data[ib] || {};
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Build Dates for {ib}
      </Typography>
      <TableContainer component={Paper} style={{ maxWidth: "800px" }}>
        <Table>
          <TableBody>
          {Object.keys(dates).map((date,index) => (
              <TableRow
                key={date}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                }}
              >
                <TableCell align="center">
                  <Link to={`/${ib}/${date}/flavors/`}>{date}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {Object.keys(dates).length > rowsPerPage && (
        <Pagination
          count={Math.ceil(Object.keys(dates).length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          style={{ marginTop: "20px" }}
        />
      )}
    </Container>
  );
};

export default DateList;
