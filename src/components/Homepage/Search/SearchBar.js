import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("IBs");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("Example search query: root : 6.32.03");

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    // Validate the query format
    if (!/^[\w-]+ ?: ?[\w.-]+$/.test(query.trim())) {
      setError(true);
      setHelperText("Invalid format. Please use: packageName : packageVersion");
      return;
    }

    // Reset error state if the query is valid
    setError(false);
    setHelperText("Example search query: root : 6.32.03");

    const [packageName, version] = query.split(":").map((s) => s.trim());

    const payload = {
      packageName,
      version,
      type: selectedOption, // 'IBs' or 'Releases'
    };

    try {
      let response;
      if (selectedOption === "IBs") {
        response = await axios.post("/api/searchIBs", payload);
        navigate("/searchResults", {
          state: { results: response.data, query: query.trim(), index: "IBs" },
        });
      } else if (selectedOption === "Releases") {
        response = await axios.post("/api/searchReleases", payload);
        navigate("/searchResults", {
          state: { results: response.data, query: query.trim(), index: "Releases" },
        });
      }
    } catch (error) {
      console.error("Error during search:", error);
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
            error={error}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Packages..."
            variant="outlined"
            fullWidth
            margin="normal"
            helperText={helperText}
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
          mt={2}
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
