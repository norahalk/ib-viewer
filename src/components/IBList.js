// src/components/IBList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const IBList = () => {
    const [ibData, setIbData] = useState({});

    useEffect(() => {
        axios.get('/api/api/folders')
            .then(response => setIbData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>IBs</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>IBs</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(ibData).map(ib => (
                            <TableRow key={ib}>
                                <TableCell>
                                    <Link to={`/dates/${ib}`}>{ib}</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default IBList;
