import React from 'react';
import { Table, TableBody, TableHead, TableContainer } from '@mui/material';

import ProductRow from './ProductRow.jsx';
import TableHeaderRow from './TableHeaderRow.jsx';

const TableComp = ({ products, matchesMobile }) => {
  const headers = [
    'Codigo',
    'Marca',
    'Rubro',
    'Modelo',
    /* 'Descripción', */
    'Iva',
    'Stock',
    'Cant.',
    'PVC',
    'PVP Clasico',
    'PVP Premium',
  ];

  return (
    <TableContainer style={{ width: '100%' }}>
      <Table style={{ width: '100%', tableLayout: 'fixed' }}>
        {matchesMobile ? (
          <colgroup>
            <col style={{ width: '100%' }} id="codigo" />
          </colgroup>
        ) : (
          <colgroup>
            <col style={{ width: '11%' }} id="codigo" />
            <col style={{ width: '10%' }} id="marca" />
            <col style={{ width: '12%' }} id="rubro" />
            <col style={{ width: '10%' }} id="nombre" />
            <col style={{ width: '9%' }} id="iva" />
            <col style={{ width: '8%' }} id="stock" />
            <col style={{ width: '9%' }} id="cant" />
            <col style={{ width: '10%' }} id="pvc" />
            <col style={{ width: '10%' }} id="pvp_clasico" />
            <col style={{ width: '10%' }} id="pvp_premium" />
          </colgroup>
        )}
        <TableHead>
          <TableHeaderRow headers={headers} />
        </TableHead>
        <TableBody style={{ width: '100%' }}>
          {products?.map((product) => (
            <ProductRow product={product} key={product.id} headers={headers} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
