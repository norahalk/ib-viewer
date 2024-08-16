import React, { useState } from "react";
import {
  Typography,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import SearchBar from "./Search/SearchBar";
import IBList from "../IBs/IBList";
import ReleaseList from "../Releases/ReleaseList";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Homepage = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" gutterBottom style={{ marginTop: "25px" }}>
        <strong>CMSSW:</strong> Integration Builds & Releases
      </Typography>
      <Typography
        variant="h7"
        gutterBottom
        style={{ marginBottom: "25px", marginTop: "25px" }}
      >
        Welcome to the <strong>CMSSW website</strong>. Here, you can view all
        the integration builds and releases for CMSSW with all their details.
      </Typography>
      <SearchBar />
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: "25px" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Releases" {...a11yProps(1)} />
          <Tab label="IBs" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ReleaseList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <IBList />
      </CustomTabPanel>
    </Box>
  );
};

export default Homepage;
