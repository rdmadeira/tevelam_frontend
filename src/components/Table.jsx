import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableContainer,
  Typography,
} from '@mui/material';
import ProductRow from './ProductRow.jsx';
import TableHeaderRow from './TableHeaderRow.jsx';

const TableComp = ({ products } /* , { ...args } */) => {
  return (
    <TableContainer>
      <Typography>Lista de precios</Typography>
      <Table /* {...args} */>
        <TableHead>
          <TableHeaderRow
            headers={[
              'Codigo',
              'Marca',
              'Rubro',
              'Descripción',
              'PVC',
              'Iva',
              'Stock',
              'Cantidad',
              'Subtotal',
            ]}
          />
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <ProductRow product={product} key={product.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
