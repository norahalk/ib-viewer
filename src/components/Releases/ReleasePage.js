import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

function ReleasePage() {
  const { releaseName } = useParams();
  const [release, setRelease] = useState(null);
  const [page, setPage] = useState(0); // State to track the current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // State to track rows per page

  useEffect(() => {
    axios
      .post("/api/searchReleases")
      .then((response) => {
        const data = response.data.find((r) => r.release_name === releaseName);
        setRelease(data);
      })
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
  const paginatedPackages = release
    ? Object.entries(release.packages).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    : [];

  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        style={{ marginBottom: "25px", marginTop: "25px" }}
      >
        Packages Used In <strong>{releaseName}</strong>
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Package Name</TableCell>
              <TableCell>Version</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPackages.map(([pkgName, pkgVersion]) => (
              <TableRow key={pkgName}>
                <TableCell>
                  <Link to={`/package/${pkgName}`}>{pkgName}</Link>
                </TableCell>
                <TableCell>{pkgVersion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {release && release.packages && (
        <TablePagination
          component="div"
          count={Object.keys(release.packages).length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]} // Optional: customize rows per page options
        />
      )}
    </div>
  );
}

export default ReleasePage;
