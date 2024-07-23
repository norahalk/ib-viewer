import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const IBList = () => {
    const navigate = useNavigate();
    const ibs = ["CMSSW_14_1", "CMSSW_14_2"];  // Example IBs

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>IB</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ibs.map((ib) => (
                        <TableRow key={ib} onClick={() => navigate(`/dates/${ib}`)}>
                            <TableCell>{ib}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default IBList;
