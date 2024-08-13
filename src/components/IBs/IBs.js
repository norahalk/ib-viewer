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
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
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

const IBs = () => {
  const data = useContext(DataContext);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Extract the versions and their corresponding details
  const reversedKeys = Object.keys(data).reverse();
  const paginatedKeys = reversedKeys.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ width: "100%" }}>
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
              {paginatedKeys.map((key, index) => {
                const ibDetails = data[key];
                return (
                  <TableRow
                    key={key}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                    }}
                  >
                    <TableCell align="center">
                      <Link to={`/${key}/dates`}>{ibDetails.version}</Link>
                    </TableCell>
                  </TableRow>
                );
              })}
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
    </Box>
  );
};

export default IBs;
