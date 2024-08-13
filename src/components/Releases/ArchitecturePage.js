import React, { useState, useEffect } from "react";
import axios from "axios";
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

function ArchitecturePage() {
  const { releaseName } = useParams();
  const [releases, setReleases] = useState([]);
  const [page, setPage] = useState(0); // State to track the current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // State to track rows per page

  useEffect(() => {
    axios
      .post("/api/searchReleases")
      .then((response) =>
        setReleases(
          response.data.filter((r) => r.release_name === releaseName)
        )
      )
      .catch((error) => console.error("Error fetching data:", error));
  }, [releaseName]);

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
  const paginatedReleases = releases.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
        <Typography
        variant="h5"
        gutterBottom
        style={{ marginBottom: "25px", marginTop: "25px" }}
      >
        Architectures for <strong>{releaseName}</strong>
      </Typography>
          <TableBody>
            {paginatedReleases.map((release) => (
              <TableRow key={release.release_name}>
                <TableCell>
                  <Link to={`/release/${release.release_name}`}>
                    {release.architecture}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={releases.length}
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
