import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

function ReleasePage() {
    const { releaseName } = useParams();
    const [release, setRelease] = useState(null);

    useEffect(() => {
        axios
            .post('/api/searchReleases', { query: '*' })
            .then((response) => {
                const data = response.data.find(r => r.release_name === releaseName);
                setRelease(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [releaseName]);

    return (
        <div>
            <h1>{releaseName}</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Flavor</TableCell>
                            <TableCell>Package Name</TableCell>
                            <TableCell>Version</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {release && release.packages && Object.entries(release.packages).map(([pkgName, pkgVersion]) => (
                            <TableRow key={pkgName}>
                                <TableCell>{release.flavor || 'No Flavor'}</TableCell>
                                <TableCell>{pkgName}</TableCell>
                                <TableCell>{pkgVersion}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ReleasePage;
