import React from 'react';
import { TableCell, TableRow } from '@mui/material';

const TableHeaderRow = ({ headers }) => {
  return (
    <TableRow sx={{ backgroundColor: '#ffa4a4' }}>
      {headers &&
        headers.map((header) => (
          <TableCell
            key={'key' + header}
            valign="middle"
            sx={{ color: '#585353' }}
            align="center"
            variant="head">
            {header}
          </TableCell>
        ))}
    </TableRow>
  );
};

export default TableHeaderRow;
