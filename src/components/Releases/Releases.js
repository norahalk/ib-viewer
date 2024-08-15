import React, { useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";

// Helper function to compare release versions
const compareReleaseVersions = (a, b) => {
  const parseVersion = (version) => version.split('_').slice(1).map(Number);
  
  const [majorA, minorA, patchA] = parseVersion(a.release_cycle);
  const [majorB, minorB, patchB] = parseVersion(b.release_cycle);

  if (majorA !== majorB) return majorB - majorA;
  if (minorA !== minorB) return minorB - minorA;
  return patchB - patchA;
};

function Releases() {
  const { releases } = useContext(DataContext); // Get releases data from context
  const [page, setPage] = useState(0); // State to track the current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // State to track rows per page

  // Sort releases by release_cycle in reverse chronological order using the custom comparator
  const sortedReleases = [...releases].sort(compareReleaseVersions);

  // Handle change in page number
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedReleases
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((release) => (
                <TableRow key={release.release_name}>
                  <TableCell>
                    {/* Link to the ArchitecturePage with the release name */}
                    <Link to={`/architecture/${release.release_name}`}>
                      {release.release_name}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={sortedReleases.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]} 
      />
    </div>
  );
}

export default Releases;
