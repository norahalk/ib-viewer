import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

function ArchitecturePage() {
    const { architecture } = useParams();
    const [releases, setReleases] = useState([]);

    useEffect(() => {
        axios
            .post('/api/searchReleases', { query: '*' })
            .then((response) => setReleases(response.data.filter(r => r.architecture === architecture)))
            .catch((error) => console.error('Error fetching data:', error));
    }, [architecture]);

    return (
        <div>
            <h1>{architecture}</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Release Name</TableCell>
                            <TableCell>Flavor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {releases.map((release) => (
                            <TableRow key={release.release_name}>
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

export default ArchitecturePage;
