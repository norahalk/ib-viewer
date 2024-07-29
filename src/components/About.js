import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom/dist";
import cmsLogo from "../cms-logo.png";

const About = () => {
  return (
    <Container>
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        <img
          src={cmsLogo}
          alt="CMS Logo"
          style={{ height: "250px", margin: "50px" }}
        />
        <Typography variant="h6" gutterBottom>
          CMSSW is a complex framework designed for data processing, simulation,
          and analysis of data collected by the CMS detector at CERN. It
          comprises over 600 packages, including external and data packages. We
          build CMSSW Integration Builds (IBs) daily and software releases on an
          almost bi-weekly basis. It is crucial to monitor the version of the
          packages used in each build and to have the capability to compare them
          across different IBs and releases.
          <br></br>For more information, please visit
          <Link
            to="https://cms-sw.github.io/"
            target="_blank"
            style={{ color: "#1e59ae", paddingLeft: "7px", margin: "0" }}
          >
            CMSSW homepage
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
