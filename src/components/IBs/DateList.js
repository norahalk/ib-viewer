import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";

const DateList = () => {
  const { ibs } = useContext(DataContext);
  const { version } = useParams(); // Get version from URL params

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter IBs for the specific version
  const ibsForVersion = Object.values(ibs).filter((ib) => ib.version === version);

  if (ibsForVersion.length === 0) {
    return <div>No data found for this version</div>;
  }

  // Group IBs by unique date (without time)
  const groupedByDate = ibsForVersion.reduce((acc, ib) => {
    const date = ib.date.split("-").slice(0, 3).join("-"); // Extract date without time
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(ib);
    return acc;
  }, {});

  // Create an array of unique dates with the earliest time for each date
  let uniqueDatesWithTimes = Object.entries(groupedByDate).map(([date, ibs]) => {
    // Sort IBs by time and get the earliest one (or choose your preferred method to display time)
    const earliestIB = ibs.sort((a, b) => a.date.localeCompare(b.date))[0];
    return earliestIB.date; // Return the full date including time
  });

  // Sort dates in descending order to show recent dates first
  uniqueDatesWithTimes = uniqueDatesWithTimes.sort((a, b) => b.localeCompare(a));

  // Handle change in page number
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  // Get the data to display for the current page
  const paginatedDates = uniqueDatesWithTimes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
        count={uniqueDatesWithTimes.length} // Total number of unique dates
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
