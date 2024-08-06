import React, { useState, useEffect, useContext } from 'react';
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
import { DataContext } from '../../contexts/DataContext';

const FlavorList = () => {
  const { ib, date } = useParams();
  const data = useContext(DataContext);
  const flavors = (data[ib] && data[ib][date]) || [];
  const flavorsArray = Object.keys(flavors);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        IB Flavors for {ib} on {date}
      </Typography>
      <TableContainer component={Paper} style={{ maxWidth: '800px' }}>
        <Table>
          <TableBody>
          {flavorsArray.map((flavor,index) => (
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
