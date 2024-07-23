// src/App.js
import React from 'react';
import './App.css';
import IBList from './components/IBList';
import DateList from './components/DateList';
import FlavorList from './components/FlavorList';
import ScriptResults from './components/ScriptResults';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<IBList />} />
                    <Route path="/dates/:ib" element={<DateList />} />
                    <Route path="/flavors/:ib/:date" element={<FlavorList />} />
                    <Route path="/results/:flavor" element={<ScriptResults />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
