// src/components/DateList.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const DateList = () => {
    const { ib } = useParams();
    const [dates, setDates] = useState({});

    useEffect(() => {
        axios.get('/api/api/folders')
            .then(response => setDates(response.data[ib]))
            .catch(error => console.error('Error fetching data:', error));
    }, [ib]);

    return (
        <div>
            <h1>Build Dates for {ib}</h1>
            <TableContainer component={Paper}>
                <Table>
                    {/* <TableHead>
                        <TableRow>
                            <TableCell>Dates</TableCell>
                        </TableRow>
                    </TableHead> */}
                    <TableBody>
                        {Object.keys(dates).map(date => (
                            <TableRow key={date}>
                                <TableCell>
                                    <Link to={`/flavors/${ib}/${date}`}>{date}</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DateList;
