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
import Releases from "./components/Releases/Releases";
import FlavorPage from "./components/Releases/FlavorPage";
import ArchitecturePage from "./components/Releases/ArchitecturePage";
import ReleasePage from "./components/Releases/ReleasePage";

function App() {

  return (
    <DataProvider>
      <Router>
        <Layout>
          <div className="App">
            <Routes>
              
              {/* Homepage */}
              <Route path="/" element={<IBList />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<SearchResult />} />

              {/* IBs */}
              <Route path="/:ib/dates" element={<DateList />} />
              <Route path="/:ib/:date/flavors" element={<FlavorList />} />
              <Route path="/:ib/:date/:flavor/architectures" element={<ArchitectureList />}/>
              <Route path="/:ib/:date/:flavor/:architecture/packages" element={<PackageList />}/>
              <Route path="/package/:packageName" element={<PackageDetails />} />

              {/* Releases */}
              <Route path="/" element={<Releases />} />
                <Route path="/architecture/:architecture" element={<ArchitecturePage />} />
                <Route path="/release/:releaseName" element={<ReleasePage />} />
                <Route path="/flavor/:flavor" element={<FlavorPage />} />

            </Routes>
          </div>
        </Layout>
      </Router>
    </DataProvider>
  );
}

export default App;
