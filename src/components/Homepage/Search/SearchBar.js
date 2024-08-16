import React, { useState } from "react";
import { TextField, Button, Container, FormControlLabel, Checkbox, FormGroup, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("IBs"); // State to track the selected checkbox
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (query.trim()) {
      const [packageName, version] = query.split(':');
      const payload = {
        packageName: packageName.trim(),
        version: version.trim(),
        type: selectedOption, // 'IBs' or 'Releases'
      };

      try {
        if (selectedOption === "IBs") {
          const response = await axios.post('/api/searchIBs', payload);
          navigate('/searchResults', { state: { results: response.data, query: query.trim(), index:"IBs"} });
        } else if (selectedOption === "Releases") {
          const response = await axios.post('/api/searchReleases', payload);
          navigate('/searchResults', { state: { results: response.data, query: query.trim() ,index:"Releases"} });
        }
      } catch (error) {
        console.error("Error during search:", error);
      }
    }
  };

  const handleCheckboxChange = (event) => {
    setSelectedOption(event.target.name);
  };

  return (
    <Container>
      <form onSubmit={handleSearch}>
        <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#1e59ae", marginLeft: "10px" }}
          >
            Search
          </Button>
        </div>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={2} // margin top
        >
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOption === "IBs"}
                  onChange={handleCheckboxChange}
                  name="IBs"
              
                />
              }
              label="IBs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOption === "Releases"}
                  onChange={handleCheckboxChange}
                  name="Releases"
                />
              }
              label="Releases"
            />
          </FormGroup>
        </Box>
      </form>
    </Container>
  );
};

export default SearchBar;
