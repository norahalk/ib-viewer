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
import SearchResult from "./components/Search/SearchResult";
import { DataProvider } from './contexts/DataContext';
import Releases from "./components/Releases/Releases";
import ArchitecturePage from "./components/Releases/ArchitecturePage";
import ReleasePage from "./components/Releases/ReleasePage";
import Homepage from "./components/IBs/Homepage";
import IBs from "./components/IBs/IBs";

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
              {/* <Route path="/:ib/dates" element={<DateList />} />
              <Route path="/:ib/:date/flavors" element={<FlavorList />} />
              <Route path="/:ib/:date/:flavor/architectures" element={<ArchitectureList />}/>
              <Route path="/:ib/:date/:flavor/:architecture/packages" element={<PackageList />}/>
              <Route path="/package/:packageName" element={<PackageDetails />} />  */}

              <Route path="/" element={<IBs />} />
              <Route path="/:version/dates" element={<DateList />} />
              <Route path="/:version/flavors/:date" element={<FlavorList />} />
              <Route path="/:version/architectures/:flavor" element={<ArchitectureList />} />
              <Route path="/:version/packages/:architecture" element={<PackageList />} />
              <Route path="/packageDetails/:packageName" element={<PackageDetails />} />

              {/* Releases */}
              <Route path="/" element={<Releases />} />
              <Route path="/architecture/:releaseName" element={<ArchitecturePage />} />
              <Route path="/release/:releaseName" element={<ReleasePage />} />

            </Routes>
          </div>
        </Layout>
      </Router>
    </DataProvider>
  );
}

export default App;
