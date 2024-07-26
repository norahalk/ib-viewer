// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../cms-logo.png'; // Update the path to your logo file

const Header = () => {
    return (
        <AppBar position="sticky" color="primary">
            <Container maxWidth="lg">
                <Toolbar>
                    <Link to="/">
                        <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '20px' }} />
                    </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        CMSSW Package IBs and Releases          </Typography>
                    {/* Add navigation links here if needed */}
                    <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>
                        Home
                    </Link>
                    <Link to="/about" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>
                        About
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
