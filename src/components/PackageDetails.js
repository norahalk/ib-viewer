import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import packageDetails from "../package_details.json"; // Assume this is your JSON file with package details
import { Container, Typography } from "@mui/material";

const PackageDetails = () => {
  const { packageName } = useParams();
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    const data = packageDetails.find((pkg) => pkg.name === packageName);
    setPackageData(data);
  }, [packageName]);

  if (!packageData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4">{packageData.name}</Typography>
      <Typography variant="body1">Description: {packageData.description}</Typography>
      <Typography variant="body1">Summary: {packageData.summary}</Typography>
      <Typography variant="body1">License: {packageData.license}</Typography>
      <Typography variant="body1">
        URL: <a href={packageData.url}>{packageData.url}</a>
      </Typography>
    </Container>
  );
};

export default PackageDetails;
