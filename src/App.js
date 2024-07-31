// src/App.js
import React from 'react';
import './App.css';
import IBList from './components/IBList';
import DateList from './components/DateList';
import FlavorList from './components/FlavorList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PackageList from './components/PackageList';
import PackageDetails from './components/PackageDetails';
import Layout from './components/Layout';
import About from './components/About';

function App() {
    return (
        <Router>
            <Layout>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<IBList />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/:ib/dates" element={<DateList />} />
                        <Route path="/:ib/:date/flavors" element={<FlavorList />} />
                        <Route path="/:ib/:date/:flavor/packages" element={<PackageList />} />
                        <Route path="/package/:packageName" element={<PackageDetails />} />


                    </Routes>
                </div>
            </Layout>
        </Router >
    );
}

export default App;
