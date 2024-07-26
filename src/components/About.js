import React from "react";
import { Container } from "@mui/material";

const About = () => {

    return (
        <Container >
            <p>CMSSW is a complex framework designed for data processing, simulation, and analysis of data collected by the CMS detector at CERN. It comprises over 600 packages, including external and data packages. We build CMSSW Integration Builds (IBs) daily and software releases on an almost bi-weekly basis. It is crutial to monitor the version of the packages used in each build and to have the capability to compare them across different IBs and releases.

                The goal is to create an interactive web application that allows users to display the packages information based on their selection criteria (such as package name, platform, architecture, etc.) and to compare different IBs/releases. Our current process already extracts a significant amount of useful information from the build process. This project involves evaluating our current methodology — with the possibility of improving it by modifying our existing Continuous Integration (CI) jobs— extracting the desired information, and developing a webpage to display it. We intend to integrate this page with our GitHub setup or the CMSSDT server. For this purpose, we are considering using the Jekyll framework, but we are open to discussing other suggestions from the student.</p>
        </Container>
    );
};

export default About;
