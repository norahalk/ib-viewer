import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";

const ArchitectureList = () => {
  const { ibs } = useContext(DataContext);
  const { version, flavor } = useParams();

  const ibsForVersionAndFlavor = Object.values(ibs).filter(ib => ib.version === version && ib.flavor === flavor);

  if (ibsForVersionAndFlavor.length === 0) {
    return <div>No data found for this version and date</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" gutterBottom>
        {flavor} Architectures for <strong>{version}</strong>
      </Typography>    
        <Table>
        <TableBody>
          {ibsForVersionAndFlavor.map((ib, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                {/* Link to the packages page for this architecture */}
                <Link to={`/${version}/packages/${ib.architecture}`}>{ib.architecture}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ArchitectureList;
