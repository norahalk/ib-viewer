// src/contexts/DataContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [ibs, setIbs] = useState([]);
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    const fetchIbs = async () => {
      try {
        const response = await axios.post("/api/searchIBs");
        setIbs(response.data);
      } catch (error) {
        console.error("Error fetching IBs data:", error);
      }
    };

    const fetchReleases = async () => {
      try {
        const response = await axios.post("/api/searchReleases");
        setReleases(response.data);
      } catch (error) {
        console.error("Error fetching Releases data:", error);
      }
    };

    fetchIbs();
    fetchReleases();
  }, []);

  return (
    <DataContext.Provider value={{ ibs, releases }}>
      {children}
    </DataContext.Provider>
  );
};
