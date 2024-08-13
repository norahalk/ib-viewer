import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";

const DateList = () => {
  const { ibs } = useContext(DataContext);
  const { version } = useParams(); // Get version from URL params

  const ibsForVersion = Object.values(ibs).filter(ib => ib.version === version);

  if (ibsForVersion.length === 0) {
    return <div>No data found for this version</div>;
  }

  return (
    <TableContainer component={Paper}>
         <Typography variant="h4" gutterBottom>
       Releases Dates for <strong>{version}</strong>
      </Typography>
      <Table>
        <TableBody>
          {ibsForVersion.map((ib, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                {/* Link to the architectures page for this date */}
                <Link to={`/${version}/flavors/${ib.date}`}>{ib.date}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DateList;
