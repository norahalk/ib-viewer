// src/components/SearchResults.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import packageDetails from '../JSON/package_details.json';
import { Container, Typography, Paper } from '@mui/material';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery().get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      const searchResults = Object.entries(packageDetails).filter(
        ([key, value]) =>
          key.toLowerCase().includes(query.toLowerCase()) ||
          value.description.toLowerCase().includes(query.toLowerCase()) ||
          value.summary.toLowerCase().includes(query.toLowerCase()) ||
          value.license.toLowerCase().includes(query.toLowerCase()) ||
          value.URL.toLowerCase().includes(query.toLowerCase())
      );
      setResults(searchResults);
    }
  }, [query]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{marginTop:"25px"}}>
        Search Results for "{query}"
      </Typography>
      {results.length > 0 ? (
        results.map(([key, value]) => (
          <Paper key={key} style={{ padding: '10px', marginBottom: '10px' }}>
            <Typography variant="h5" gutterBottom>
              {key}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Description:</strong> {value.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Summary:</strong> {value.summary}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>License:</strong> {value.license}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>URL:</strong> {value.URL === 'N/A' ? (
                'N/A'
              ) : (
                <a href={value.URL} target="_blank" rel="noopener noreferrer">{value.URL}</a>
              )}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography variant="body1">No results found.</Typography>
      )}
    </Container>
  );
};

export default SearchResults;
