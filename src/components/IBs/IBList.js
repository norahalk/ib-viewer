import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Pagination,
  Container,
  Typography,
} from "@mui/material";
import SearchBar from "../SearchBar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
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
const IBList = () => {
  const [ibData, setIbData] = useState({});
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios
      .get("/api/folders")
      .then((response) => setIbData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayedRows = Object.keys(ibData).slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="IBs" {...a11yProps(0)} />
          <Tab label="Releases" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom style={{ marginTop: "25px" }}>
            <strong>CMSSW:</strong> Integration Builds & Releases
          </Typography>
          <Typography
            variant="h7"
            gutterBottom
            style={{ marginBottom: "25px", marginTop: "25px" }}
          >
            Welcome to the <strong>CMSSW website</strong>. Here, you can view
            all the integration builds and releases for CMSSW with all their
            details.
          </Typography>
          <SearchBar />

          <TableContainer component={Paper} style={{ maxWidth: "800px" }}>
            <Table>
              <TableBody>
                {displayedRows.map((ib, index) => (
                  <TableRow
                    key={ib}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                    }}
                  >
                    <TableCell align="center">
                      <Link to={`/${ib}/dates`}>{ib}</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {Object.keys(ibData).length > rowsPerPage && (
            <Pagination
              count={Math.ceil(Object.keys(ibData).length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              style={{ marginTop: "20px" }}
            />
          )}
        </Container>{" "}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Releases
      </CustomTabPanel>
    </Box>
  );
};

export default IBList;
