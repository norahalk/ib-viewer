import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, TablePagination } from "@mui/material";

const ArchitectureList = () => {
  const { ibs } = useContext(DataContext);
  const { version, date, flavor } = useParams(); // Get version, date, and flavor from URL params

  // Filter IBs for the specific version, date, and flavor
  const filteredIBs = Object.values(ibs).filter(
    (ib) => ib.version === version && ib.date.startsWith(date) && ib.flavor === flavor
  );

  // Extract unique architectures from the filtered IBs
  const uniqueArchitectures = [...new Set(filteredIBs.map((ib) => ib.architecture))];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (uniqueArchitectures.length === 0) {
    return <div>No architectures found for this version, date, and flavor combination</div>;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  const paginatedArchitectures = uniqueArchitectures.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" gutterBottom style={{ marginTop: "25px" }}>
        Architectures for <strong>{version}</strong> on {date} ({flavor})
      </Typography>
      <Table>
        <TableBody>
          {paginatedArchitectures.map((architecture, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                {/* Link to the packages page for this architecture */}
                <Link to={`/IB/${version}/${architecture}/packages`}>
                  {architecture}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={uniqueArchitectures.length} // Total number of unique architectures
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
      />
    </TableContainer>
  );
};

export default ArchitectureList;
