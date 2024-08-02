import React, { useEffect, useState } from "react";
import dataJSON from "../../cmssw-ib.json";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const PackageList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const formattedData = Object.values(dataJSON); // Convert the JSON object to an array
    setData(formattedData);
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        className: "center",
        Cell: ({ row }) => (
          <Typography variant="body1" className="center">
            <Link to={`/package/${row.original.name}`}>
              {row.original.name}
            </Link>
          </Typography>
        ),
      },
      {
        Header: "Version",
        accessor: "version",
        className: "center",
        Cell: ({ row }) => {
          const versionNumber = row.original.version.split("-")[0];
          return (
            <Typography variant="body1" className="center">
              {versionNumber}
            </Typography>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } }, // Initial page index and page size
    useGlobalFilter,
    usePagination
  );

  return (
    <Container>
      <div className="search-bar">
        <TextField
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </div>
      <TableContainer component={Paper}>
        <Table {...getTableProps()} className="table">
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  className={row.index % 2 === 0 ? "even" : "odd"}
                >
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination">
        <Button onClick={() => gotoPage(0)} disabled={pageIndex === 0}>
          {"<<"}
        </Button>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </Button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </Button>
        <Button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={pageIndex === pageCount - 1}
        >
          {">>"}
        </Button>
        <span>
          Go to page:{" "}
          <TextField
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "75px" }}
            variant="outlined"
            size="small"
          />
        </span>
        <TextField
          select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
          size="small"
          style={{ marginLeft: "10px" }}
        >
          {[5, 10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </TextField>
      </div>
    </Container>
  );
};

export default PackageList;
