// src/components/SearchBar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <Container>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
      >
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <div style={{ display: "block", verticalAlign: "middle" }}>
          <FormControlLabel control={<Checkbox />} label="IBs" />
          <FormControlLabel control={<Checkbox />} label="Releases" />

          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#1e59ae", marginLeft: "10px" }}
          >
            Search
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SearchBar;
