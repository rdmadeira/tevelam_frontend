import React from 'react';
import { Table, TableBody, TableHead, TableContainer } from '@mui/material';
import ProductRow from './ProductRow.jsx';
import TableHeaderRow from './TableHeaderRow.jsx';

const TableComp = ({ products /* , filterValues, setFilterValues */ }) => {
  /* HACER FILTRO POR PRODUCTS O POR FILTERVALUES ADENTRO DE ROW ???? */
  return (
    <TableContainer style={{ width: '100%' }}>
      <Table style={{ width: '120%', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '10%' }} id="codigo" />
          <col style={{ width: '10%' }} id="marca" />
          <col style={{ width: '10%' }} id="rubro" />
          <col style={{ width: '10%' }} id="nombre" />
          <col style={{ width: '26%' }} id="descripcion" />
          <col style={{ width: '10%' }} id="pvc" />
          <col style={{ width: '7%' }} id="iva" />
          <col style={{ width: '10%' }} id="stock" />
          <col style={{ width: '7%' }} id="cant" />
          <col style={{ width: '13%' }} id="sub" />
        </colgroup>
        <TableHead>
          <TableHeaderRow
            headers={[
              'Codigo',
              'Marca',
              'Rubro',
              'Modelo',
              'Descripción',
              'PVC',
              'Iva',
              'Stock',
              'Cantidad',
              'Subtotal',
            ]}
          />
        </TableHead>
        <TableBody style={{ width: '100%' }}>
          {products?.map((product) => (
            <ProductRow product={product} key={product.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
