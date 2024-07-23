import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DateList = () => {
    const { ib } = useParams();
    const navigate = useNavigate();
    const dates = ["2024-07-09-1100", "2024-07-10-1100"];  // Example dates

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dates.map((date) => (
                        <TableRow key={date} onClick={() => navigate(`/flavors/${ib}/${date}`)}>
                            <TableCell>{date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DateList;
