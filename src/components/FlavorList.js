import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const FlavorList = () => {
    const { ib, date } = useParams();
    const navigate = useNavigate();
    const flavors = ["GPU", "DEFAULT"];  // Example flavors

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Flavor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {flavors.map((flavor) => (
                        <TableRow key={flavor} onClick={() => navigate(`/results/${flavor}`)}>
                            <TableCell>{flavor}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FlavorList;
