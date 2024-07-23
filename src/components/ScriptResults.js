import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const ScriptResults = () => {
    const { flavor } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                await axios.get('http://localhost:5000/run-script');
                const res = await axios.get(`http://localhost:5000/results/${flavor}_results.json`);
                setResults(res.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch script results');
                setLoading(false);
            }
        };

        fetchResults();
    }, [flavor]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>{error}</Typography>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Package Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Summary</TableCell>
                        <TableCell>License</TableCell>
                        <TableCell>URL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(results).map((packageName) => (
                        <TableRow key={packageName}>
                            <TableCell>{packageName}</TableCell>
                            <TableCell>{results[packageName].description}</TableCell>
                            <TableCell>{results[packageName].summary}</TableCell>
                            <TableCell>{results[packageName].license}</TableCell>
                            <TableCell><a href={results[packageName].URL}>{results[packageName].URL}</a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ScriptResults;
