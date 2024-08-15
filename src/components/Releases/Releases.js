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

function Releases() {
  const { releases} = useContext(DataContext); // Get IBs data from context
  const [page, setPage] = useState(0); // State to track the current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // State to track rows per page

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
            {releases
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((release) => (
                <TableRow key={release.architecture}>
                  <TableCell>
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

export default Releases;
