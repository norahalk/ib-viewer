import React, { useState, useContext } from "react";
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
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import SearchBar from "../Search/SearchBar";
import { DataContext } from "../../contexts/DataContext";

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
  const data = useContext(DataContext);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Reverse the keys of the data object
  const reversedKeys = Object.keys(data).reverse();
  const paginatedKeys = reversedKeys.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
        Releases
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TableContainer component={Paper} style={{ maxWidth: "800px" }}>
            <Table>
              <TableBody>
                {paginatedKeys.map((ib, index) => (
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
          {reversedKeys.length > rowsPerPage && (
            <Pagination
              count={Math.ceil(reversedKeys.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              style={{ marginTop: "20px" }}
            />
          )}
        </Container>
      </CustomTabPanel>
    </Box>
  );
};

export default IBList;
