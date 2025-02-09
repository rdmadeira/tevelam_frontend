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
        {product.descripcion}
      </TableCell>
      <TableCell valign="middle" align="center">
        {'$ ' +
          new Intl.NumberFormat('es-AR', {
            currency: 'ARG',
          }).format(product.precio_arg)}
      </TableCell>
      <TableCell valign="middle" align="center">
        {new Intl.NumberFormat('es-AR', {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 1,
        }).format(product.tasa_iva)}
      </TableCell>
      <TableCell valign="middle" align="center">
        {product.stock_disp > 5
          ? 'Mayor a 5'
          : 5 >= product.stock_disp < 0
            ? 'Menor a 5'
            : 'Sin Stock'}
      </TableCell>
      <TableCell valign="middle" align="center">
        {0}
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
