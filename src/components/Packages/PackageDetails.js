// src/components/PackageDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import packageDetails from "../../JSON/package_details.json";
import { Container, Typography, Paper, Box } from "@mui/material";

const PackageDetails = () => {
  const { packageName } = useParams();
  const [details, setDetails] = useState({});

  useEffect(() => {
    const packageData = packageDetails[packageName] || null;
    setDetails(packageData);
  }, [packageName]);

  if (!details) {
    return (
      <Container>
        <Box sx={{ marginTop: "50px", textAlign: "center" }}>
          <Typography variant="h4" color="error">
            No details found for package: {packageName}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: "20px" }}>
        Package Description
      </Typography>
      <Paper sx={{ padding: "25px", marginTop: "20px" }}>
        <Typography variant="h5" gutterBottom>
          {packageName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Description:</strong> {details.description || "N/A"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Summary:</strong> {details.summary || "N/A"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>License:</strong> {details.license || "N/A"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>URL:</strong>{" "}
          {details.URL && details.URL !== "N/A" ? (
            <a href={details.URL} target="_blank" rel="noopener noreferrer">
              {details.URL}
            </a>
          ) : (
            "N/A"
          )}
        </Typography>
      </Paper>
    </Container>
  );
};

export default PackageDetails;
