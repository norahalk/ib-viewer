import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function Releases() {
    const [releases, setReleases] = useState([]);

    useEffect(() => {
        axios
            .post('/api/searchReleases', { query: '*' })
            .then((response) => setReleases(response.data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>CMSSW Releases</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Architecture</TableCell>
                            <TableCell>Release Name</TableCell>
                            <TableCell>Flavor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {releases.map((release) => (
                            <TableRow key={release.architecture}>
                                <TableCell>
                                    <Link to={`/architecture/${release.architecture}`}>
                                        {release.architecture}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/release/${release.release_name}`}>
                                        {release.release_name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/flavor/${release.flavor}`}>
                                        {release.flavor || 'No Flavor'}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Releases;
