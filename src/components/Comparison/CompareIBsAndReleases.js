import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const CompareIBsAndReleases = () => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <h1>Compare IBs and Releases</h1>

      <TextField
        // error={error}
        // value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="Choose an IB"
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <TextField
        // error={error}
        // value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="Choose a Release"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        style={{ backgroundColor: "#1e59ae", marginLeft: "10px" }}
      >
        Compare
      </Button>
    </div>
  );
};

export default CompareIBsAndReleases;
