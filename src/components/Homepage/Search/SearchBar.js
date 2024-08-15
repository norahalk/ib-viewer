import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, FormControlLabel, Checkbox, FormGroup, Box } from "@mui/material";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected checkbox
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() && selectedOption) {
      const response = await fetch(`/search${selectedOption}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle the response data here, e.g., update state or pass to another component
        navigate(`/searchResults`, { state: { results: data, filter: selectedOption } });
      }
    }
  };

  const handleCheckboxChange = (event) => {
    // Update the selected option based on the checkbox clicked
    setSelectedOption(event.target.name);
  };

  return (
    <Container>
      <form onSubmit={handleSearch}>
        <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Packages..."
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

        {/* Checkbox Section */}
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
