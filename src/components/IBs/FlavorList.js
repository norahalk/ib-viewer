// src/components/FlavorList.js
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
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

const FlavorList = () => {
  const { ibs } = useContext(DataContext);
  const { version } = useParams(); // Get version from URL params

  // Extract all unique flavors for the given version
  const flavorsSet = new Set();
  Object.values(ibs).forEach(ib => {
    if (ib.version === version) {
      flavorsSet.add(ib.flavor);
    }
  });

  const flavorsArray = Array.from(flavorsSet);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 20;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Flavors for <strong>{version}</strong>
      </Typography>
      <TableContainer component={Paper} style={{ maxWidth: '800px' }}>
        <Table>
          <TableBody>
            {flavorsArray.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((flavor, index) => (
              <TableRow
                key={flavor}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff',
                }}
              >
                <TableCell align="center">
                  <Link to={`/${version}/architectures/${flavor}`}>{flavor}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {flavorsArray.length > rowsPerPage && (
        <Pagination
          count={Math.ceil(flavorsArray.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          style={{ marginTop: '20px' }}
        />
      )}
    </Container>
  );
};

export default FlavorList;
