// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IBList from "./components/IBs/IBList";
import DateList from "./components/IBs/DateList";
import FlavorList from "./components/IBs/FlavorList";
import ArchitectureList from "./components/IBs/ArchitectureList";
import About from "./components/HeaderBar/About";
import PackageList from "./components/Packages/PackageList";
import PackageDetails from "./components/Packages/PackageDetails";
import Layout from "./components/HeaderBar/Layout";
import SearchResult from "./components/Search/SearchResult";
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <Layout>
          <div className="App">
            <Routes>
              <Route path="/" element={<IBList />} />
              <Route path="/about" element={<About />} />
              <Route path="/:ib/dates" element={<DateList />} />
              <Route path="/:ib/:date/flavors" element={<FlavorList />} />
              <Route
                path="/:ib/:date/:flavor/architectures"
                element={<ArchitectureList />}
              />
              <Route
                path="/:ib/:date/:flavor/:architecture/packages"
                element={<PackageList />}
              />
              <Route path="/package/:packageName" element={<PackageDetails />} />
              <Route path="/search" element={<SearchResult />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </DataProvider>
  );
}

export default App;
