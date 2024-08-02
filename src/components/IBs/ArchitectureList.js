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
  Container,
  Typography,
} from '@mui/material';

const ArchitectureList = () => {
  const { ib, date, flavor } = useParams();
  const [architectures, setArchitectures] = useState([]);

  useEffect(() => {
    axios.get('/api/folders')
      .then(response => {
        const data = response.data[ib][date][flavor];
        setArchitectures(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [ib, date, flavor]);

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Architectures for {flavor} on {date}
      </Typography>
      <TableContainer component={Paper} style={{ maxWidth: '800px' }}>
        <Table>
          <TableBody>
            {architectures.map((architecture, index) => (
              <TableRow
                key={architecture}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff',
                }}
              >
                <TableCell align="center">
                  <Link to={`/${ib}/${date}/${flavor}/${architecture}/packages`}>{architecture}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ArchitectureList;
