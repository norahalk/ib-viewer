import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Pagination, Container, Typography } from "@mui/material";

const FlavorList = () => {
  const { ibs } = useContext(DataContext);
  const { version, date } = useParams(); // Get version and date from URL params

  // Filter IBs for the specific version and date and extract unique flavors
  const uniqueFlavors = [...new Set(Object.values(ibs)
    .filter(ib => ib.version === version && ib.date.startsWith(date))
    .map(ib => ib.flavor))];

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Flavors for <strong>{version}</strong> on {date}
      </Typography>
      <TableContainer component={Paper} style={{ maxWidth: '800px' }}>
        <Table>
          <TableBody>
            {uniqueFlavors.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((flavor, index) => (
              <TableRow
                key={flavor}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff',
                }}
              >
                <TableCell align="center">
                  {/* Updated Link to include version, date, and flavor */}
                  <Link to={`/IB/${version}/${date}/architectures/${flavor}`}>
                    {flavor}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {uniqueFlavors.length > rowsPerPage && (
        <Pagination
          count={Math.ceil(uniqueFlavors.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          style={{ marginTop: '20px' }}
        />
      )}
    </Container>
  );
};

export default FlavorList;
