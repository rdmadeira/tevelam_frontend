import React from 'react';
import { TableCell, TableRow } from '@mui/material';

const TableHeaderRow = ({ headers }) => {
  return (
    <TableRow>
      {headers &&
        headers.map((header) => (
          <TableCell key={'key' + header} valign="middle" align="center">
            {header}
          </TableCell>
        ))}
    </TableRow>
  );
};

export default TableHeaderRow;
