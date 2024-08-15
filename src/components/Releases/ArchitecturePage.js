import React, { useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";

function ArchitecturePage() {
  const { releaseName } = useParams(); // Get the release name from URL params
  const { releases } = useContext(DataContext); 
  const [page, setPage] = useState(0); // State to track the current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // State to track rows per page

  // Filter the releases to get the unique architectures for the selected release
  const uniqueArchitectures = [...new Set(releases
    .filter(release => release.release_name === releaseName)
    .map(release => release.architecture))];

  // Handle change in page number
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Pagination logic
  const paginatedArchitectures = uniqueArchitectures.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      <TableContainer component={Paper}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          style={{ marginBottom: "25px", marginTop: "25px" }}
        >
          Architectures for <strong>{releaseName}</strong>
        </Typography>
        <Table>
          <TableBody>
            {paginatedArchitectures.map((architecture, index) => (
              <TableRow key={index}>
                <TableCell>
                  {/* Link to the packages page for this architecture */}
                  <Link to={`/release/packages/${architecture}`}>
                    {architecture}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={uniqueArchitectures.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]} // Optional: customize rows per page options
      />
    </div>
  );
}

export default ArchitecturePage;
