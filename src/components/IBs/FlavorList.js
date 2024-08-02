import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
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
} from '@mui/material';

const FlavorList = () => {
  const { ib, date } = useParams();
  const [flavors, setFlavors] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    axios.get('/api/folders')
      .then(response => {
        const data = response.data[ib][date];
        const flavorArray = Object.keys(data);
        setFlavors(flavorArray);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [ib, date]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayedRows = Array.isArray(flavors) ? flavors.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  ) : [];

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        IB Flavors for {ib} on {date}
      </Typography>
      <TableContainer component={Paper} style={{ maxWidth: '800px' }}>
        <Table>
          <TableBody>
            {displayedRows.map((flavor, index) => (
              <TableRow
                key={flavor}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff',
                }}
              >
                <TableCell align="center">
                  <Link to={`/${ib}/${date}/${flavor}/architectures`}>{flavor}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {flavors.length > rowsPerPage && (
        <Pagination
          count={Math.ceil(flavors.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          style={{ marginTop: '20px' }}
        />
      )}
    </Container>
  );
};

export default FlavorList;
