import React from 'react';
import { TableCell, TableRow } from '@mui/material';

const TableHeaderRow = ({ headers }) => {
  return (
    <TableRow sx={{ backgroundColor: '#ffa4a4' }}>
      {headers &&
        headers.map((header) => (
          <TableCell
            key={'key' + header}
            className="table-header-cell"
            valign="middle"
            sx={{ color: '#585353', fontSize: '1.4vw' }}
            align="center"
            variant="head">
            {header}
          </TableCell>
        ))}
    </TableRow>
  );
};

export default TableHeaderRow;
