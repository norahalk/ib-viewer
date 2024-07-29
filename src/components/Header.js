// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import cmsLogo from "../cms-logo.png";

const Header = () => {
  return (
    <AppBar position="sticky" style={{ backgroundColor: "#1e59ae" }}>
      <Container maxWidth="lg">
        <Toolbar>
          <img
            src={cmsLogo}
            alt="CMS Logo"
            style={{ height: "50px", marginRight: "20px" }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CMSSW Package IBs and Releases
          </Typography>
          <Link
            to="/"href
            style={{
              color: "white",
              textDecoration: "none",
              marginRight: "20px",
            }}
          >
            Home
          </Link>
          <Link
            to="/about"
            style={{
              color: "white",
              textDecoration: "none",
              marginRight: "20px",
            }}
          >
            About
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
