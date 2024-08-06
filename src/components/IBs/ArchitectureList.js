import React, {useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
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
import { DataContext } from '../../contexts/DataContext';

const ArchitectureList = () => {
  const { ib, date, flavor } = useParams();
  const data = useContext(DataContext);
  const architectures = (data[ib] && data[ib][date] && data[ib][date][flavor]) || [];


  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Architectures for {flavor} on {date}
      </Typography>
      <TableContainer component={Paper} style={{ maxWidth: '800px' }}>
        <Table>
          <TableBody>
          {architectures.map((architecture,index) => (
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
