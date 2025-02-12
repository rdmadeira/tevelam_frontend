import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import CantCell from './CantCell.jsx';
import { useSelector } from 'react-redux';

const ProductRow = ({ product } /* , { ...args } */) => {
  const carrito = useSelector((store) => store.carrito);
  const [cant, setCant] = React.useState(0);
  /* const prodInCarrito = carrito.find((item) => item.id === product.id); */

  return (
    <TableRow /* {...args} */>
      <TableCell valign="middle" align="center">
        {product.codigo_red[0].codigo}
      </TableCell>
      <TableCell valign="middle" align="center">
        {product.marca}
      </TableCell>
      <TableCell valign="middle" align="center">
        {product.rubro}
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
      {product && (
        <CantCell
          valign="middle"
          align="center"
          carrito={carrito}
          setCant={setCant}
          product={product}></CantCell>
      )}

      <TableCell valign="middle" align="center">
        {/* {'cart.find(item => item.id === product.id).cant'} */}
        {new Intl.NumberFormat('es-AR', {
          currency: 'ARG',
        }).format(product.precio_arg * cant)}
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
