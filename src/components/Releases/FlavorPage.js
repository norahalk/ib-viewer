import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

function FlavorPage() {
    const { flavor } = useParams();
    const [releases, setReleases] = useState([]);

    useEffect(() => {
        axios
            .post('/api/searchReleases', { query: '*' })
            .then((response) => setReleases(response.data.filter(r => r.flavor === flavor)))
            .catch((error) => console.error('Error fetching data:', error));
    }, [flavor]);

    return (
        <div>
            <h1>{flavor || 'No Flavor'}</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Release Name</TableCell>
                            <TableCell>Package Name</TableCell>
                            <TableCell>Version</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {releases.map((release) => (
                            Object.entries(release.packages).map(([pkgName, pkgVersion]) => (
                                <TableRow key={pkgName}>
                                    <TableCell>{release.release_name}</TableCell>
                                    <TableCell>{pkgName}</TableCell>
                                    <TableCell>{pkgVersion}</TableCell>
                                </TableRow>
                            ))
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default FlavorPage;
