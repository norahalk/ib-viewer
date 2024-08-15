import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, TablePagination } from "@mui/material";

const DateList = () => {
  const { ibs } = useContext(DataContext);
  const { version } = useParams(); // Get version from URL params

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter IBs for the specific version and group by unique date
  const uniqueDates = [...new Set(Object.values(ibs).filter(ib => ib.version === version).map(ib => ib.date.split("T")[0]))]
    .sort((a, b) => b.localeCompare(a));

  if (uniqueDates.length === 0) {
    return <div>No data found for this version</div>;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const paginatedDates = uniqueDates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" gutterBottom style={{ marginTop: "25px" }}>
        Release Dates for <strong>{version}</strong>
      </Typography>
      <Table>
        <TableBody>
          {paginatedDates.map((date, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                {/* Link to the FlavorList page for this date */}
                <Link to={`/${version}/flavors/${date}`}>{date}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={uniqueDates.length} // Total number of unique dates
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
      />
    </TableContainer>
  );
};

export default DateList;
