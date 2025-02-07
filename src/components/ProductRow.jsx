import React from 'react';
import { TableRow, TableCell } from '@mui/material';

const ProductRow = ({ product } /* , { ...args } */) => {
  /* console.log('product in ProductRow', product); */

  return (
    <TableRow /* {...args} */>
      <TableCell valign="middle" align="center">
        {product.codigo_red[0].codigo}
      </TableCell>
      <TableCell valign="middle" align="center">
        {product.marca}
      </TableCell>
      <TableCell valign="middle" align="center">
        {product.codigo_red[0].codigo}
      </TableCell>
      <TableCell valign="middle" align="center">
        {product.codigo_red[0].codigo}
      </TableCell>
      <TableCell valign="middle" align="center">
        {product.codigo_red[0].codigo}
      </TableCell>
      <TableCell valign="middle" align="center">
        {product.codigo_red[0].codigo}
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
