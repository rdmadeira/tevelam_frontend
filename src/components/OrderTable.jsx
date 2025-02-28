import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material';
import TableHeaderRow from './TableHeaderRow.jsx';

const OrderTable = () => {
  const carrito = useSelector((store) => store.carrito);

  return (
    <Table>
      <TableHead>
        <TableHeaderRow
          headers={[
            'Marca',
            'Modelo',
            ' Descripción',
            'Cant',
            '$/un',
            'Subtotal',
          ]}>
          {/* <TableCell>Marca</TableCell>
          <TableCell>Modelo</TableCell>
          <TableCell>Descripcion</TableCell>
          <TableCell>$/un</TableCell>
          <TableCell>Subtotal</TableCell> */}
        </TableHeaderRow>
      </TableHead>
      <TableBody>
        {carrito.map((item) => (
          <TableRow key={item.codigo_red[0].id}>
            <TableCell valign="middle" align="center">
              {item.marca}
            </TableCell>
            <TableCell valign="middle" align="center">
              {item.nombre}
            </TableCell>
            <TableCell valign="middle" align="center">
              {item.descripcion}
            </TableCell>
            <TableCell valign="middle" align="center">
              {item.cant}
            </TableCell>
            <TableCell valign="middle" align="center">
              {'$ ' +
                new Intl.NumberFormat('es-AR', {
                  currency: 'ARG',
                }).format(item.precio_arg)}
            </TableCell>
            <TableCell valign="middle" align="center">
              {'$ ' +
                new Intl.NumberFormat('es-AR', {
                  currency: 'ARG',
                }).format(item.precio_arg * item.cant)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
