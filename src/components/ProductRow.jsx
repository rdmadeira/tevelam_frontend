import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import CantCell from './CantCell.jsx';
import { useSelector } from 'react-redux';
import StockComp from './StockComponent.jsx';

const ProductRow = ({ product }) => {
  const carrito = useSelector((store) => store.carrito);
  const filterValues = useSelector((store) => store.filter);

  // const [cant, setCant] = React.useState(0);
  const prodInCarrito = carrito.find((item) => item.id === product.id);

  const isFiltered = (product, filterValues) => {
    const marca = product.Marca.marca;

    const marcaMatch =
      filterValues?.marcas.findIndex((m) => m === marca) >= 0 ||
      filterValues?.marcas.length === 0;

    const rubroMatch =
      filterValues?.rubro.findIndex((m) => m === product.rubro) >= 0 ||
      filterValues?.rubro.length === 0;
    const modeloMatch =
      filterValues?.modelo.findIndex((m) => m === product.nombre) >= 0 ||
      filterValues?.modelo.length === 0;

    const stockMatch = filterValues?.stock.find(
      (s) =>
        (product.stock_disp > 5 && s === 'Mayor a 5') ||
        (product.stock_disp <= 5 &&
          product.stock_disp > 0 &&
          s === 'Menor a 5') ||
        (product.stock_disp <= 0 && s === 'Sin Stock'),
    )
      ? true
      : filterValues.stock.length === 0;

    const cantMatch = filterValues.cant.find(
      (c) => prodInCarrito && c === prodInCarrito?.cant,
    )
      ? true
      : !prodInCarrito && filterValues.cant.includes(0)
        ? true
        : filterValues.cant.length === 0;

    return marcaMatch && rubroMatch && modeloMatch && stockMatch && cantMatch;
  };

  return (
    isFiltered(product, filterValues) && (
      <TableRow>
        <TableCell valign="middle" align="center" sx={{ width: '10%' }}>
          {product.codigo_red[0].codigo}
        </TableCell>
        <TableCell valign="middle" align="center" sx={{ width: '10%' }}>
          {product.marca}
        </TableCell>
        <TableCell valign="middle" align="center" sx={{ width: '10%' }}>
          {product.rubro}
        </TableCell>
        <TableCell valign="middle" align="center" sx={{ width: '6%' }}>
          {product.nombre}
        </TableCell>
        <TableCell
          valign="middle"
          align="center"
          /* sx={{ display: 'inline-block', wrap: 'wrap' }} */
          sx={{
            width: '25%',
            minInlineSize: '0',
          }}
          className="MuiTableCell-alignJustify">
          {product.descripcion}
        </TableCell>
        <TableCell valign="middle" align="center" sx={{ width: '10%' }}>
          {'$ ' +
            new Intl.NumberFormat('es-AR', {
              currency: 'ARG',
            }).format(product.precio_arg)}
        </TableCell>
        <TableCell valign="middle" align="center" sx={{ width: '10%' }}>
          {new Intl.NumberFormat('es-AR', {
            style: 'percent',
            maximumFractionDigits: 2,
            minimumFractionDigits: 1,
          }).format(product.tasa_iva)}
        </TableCell>
        <TableCell
          valign="middle"
          align="center"
          sx={{
            width: '10%',
            backgroundColor:
              product.stock_disp > 5
                ? '#8adc8a'
                : product.stock_disp <= 5 && product.stock_disp > 0
                  ? '#f2f29a'
                  : '#f9a5a5',
          }}>
          <StockComp stock={product.stock_disp} />
        </TableCell>
        {product && (
          <CantCell // Ver Cant!!!!
            valign="middle" // Ver Cant!!!!
            align="center" // Ver Cant!!!!
            carrito={carrito} // Ver Cant!!!!
            // Ver Cant!!!! // Ver cant!!!!!!!!
            product={product}
            cant={prodInCarrito?.cant || 0}
            sx={{ width: '300px' }}></CantCell>
        )}

        <TableCell valign="middle" align="center">
          {
            '$ ' +
              new Intl.NumberFormat('es-AR', {
                currency: 'ARG',
              }).format(product.precio_arg * prodInCarrito?.cant || 0) // Ver Cant!!!!
          }
        </TableCell>
      </TableRow>
    )
  );
};

export default ProductRow;
