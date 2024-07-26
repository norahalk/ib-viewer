// src/components/FlavorList.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const FlavorList = () => {
    const { ib, date } = useParams();
    const [flavors, setFlavors] = useState([]);

    useEffect(() => {
        axios.get('/api/api/folders')
            .then(response => setFlavors(response.data[ib][date]))
            .catch(error => console.error('Error fetching data:', error));
    }, [ib, date]);

    return (
        <div>
            <h1>Operating Systems for {ib} on {date}</h1>
            <TableContainer component={Paper}>
                <Table>
                    {/* <TableHead>
                        <TableRow>
                            <TableCell>Flavors</TableCell>
                        </TableRow>
                    </TableHead> */}
                    <TableBody>
                        {flavors.map(flavor => (
                            <TableRow key={flavor}>
                                <TableCell>
                                    <Link to={`/flavors/${ib}/${date}/packages`}>{flavor}</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default FlavorList;
