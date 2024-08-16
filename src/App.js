// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/HeaderBar/About";
import PackageList from "./components/Packages/PackageList";
import PackageDetails from "./components/Packages/PackageDetails";
import Layout from "./components/HeaderBar/Layout";
import { DataProvider } from './contexts/DataContext';
import Homepage from "./components/Homepage/Homepage";
import SearchResults from "./components/Homepage/Search/SearchResults";
import SearchResultPackages from "./components/Homepage/Search/SearchResultPackages";

function App() {

  return (
    <DataProvider>
      <Router>
        <Layout>
          <div className="App">
            <Routes>

              {/* Homepage */}
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<About />} />
              <Route path="/searchResults" element={<SearchResults />} />
              <Route path="/search/:version/:architecture/packages" element={<SearchResultPackages/>} />

              {/* IBs */}
              <Route path="/:packageName/packageDetails" element={<PackageDetails />} />
              <Route path="/ib/:version/:architecture/packages" element={<PackageList type="IB"/>} />

              {/* Releases */}
              <Route path="/release/:architecture/packages" element={<PackageList type="Release"/>} />
 
            </Routes>
          </div>
        </Layout>
      </Router>
    </DataProvider>
  );
}

export default App;
