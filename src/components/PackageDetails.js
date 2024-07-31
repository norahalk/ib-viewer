// src/components/PackageDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import packageDetails from "../JSON/package_details.json";
import { Container, Typography, Paper } from "@mui/material";

const PackageDetails = () => {
  const { packageName } = useParams();
  const [details, setDetails] = useState({});

  useEffect(() => {
    const packageData = packageDetails[packageName] || {
      description: "N/A",
      summary: "N/A",
      license: "N/A",
      URL: "N/A",
    };
    setDetails(packageData);
  }, [packageName]);

  return (
    <Container>
      <Paper style={{ padding: "25px", marginTop: "100px" }}>
        <Typography variant="h4" gutterBottom>
          {packageName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Description:</strong> {details.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Summary:</strong> {details.summary}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>License:</strong> {details.license}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>URL:</strong>{" "}
          {details.URL === "N/A" ? (
            "N/A"
          ) : (
            <a href={details.URL} target="_blank" rel="noopener noreferrer">
              {details.URL}
            </a>
          )}
        </Typography>
      </Paper>
    </Container>
  );
};

export default PackageDetails;
