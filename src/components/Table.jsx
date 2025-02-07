import React from 'react';
import { Table, TableBody, TableHead, TableContainer } from '@mui/material';
import ProductRow from './ProductRow.jsx';

const TableComp = ({ products } /* , { ...args } */) => {
  console.log('products', products);

  return (
    <TableContainer>
      <Table /* {...args} */>
        <TableHead>Lista de precios</TableHead>
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
