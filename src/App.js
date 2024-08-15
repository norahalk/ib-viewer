// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DateList from "./components/IBs/DateList";
import FlavorList from "./components/IBs/FlavorList";
import ArchitectureList from "./components/IBs/ArchitectureList";
import About from "./components/HeaderBar/About";
import PackageList from "./components/Packages/PackageList";
import PackageDetails from "./components/Packages/PackageDetails";
import Layout from "./components/HeaderBar/Layout";
import SearchResult from "./components/Homepage/Search/SearchResult";
import { DataProvider } from './contexts/DataContext';
import ArchitecturePage from "./components/Releases/ArchitecturePage";
import Homepage from "./components/Homepage/Homepage";

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
              <Route path="/search" element={<SearchResult />} />

              {/* IBs */}
              <Route path="/:version/dates" element={<DateList />} />
              <Route path="/:version/flavors/:date" element={<FlavorList />} />
              <Route path="/IB/:version/:date/architectures/:flavor" element={<ArchitectureList />} />
              <Route path="/IB/:version/:architecture/packages" element={<PackageList type="IB"/>} />
              <Route path="/packageDetails/:packageName" element={<PackageDetails />} />

              {/* Releases */}
              <Route path="/architecture/:releaseName" element={<ArchitecturePage />} />
              <Route path="/release/packages/:architecture" element={<PackageList type="Release"/>} />
 
            </Routes>
          </div>
        </Layout>
      </Router>
    </DataProvider>
  );
}

export default App;
