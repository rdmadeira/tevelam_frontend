import React from 'react';
import {
  TableRow,
  /* TableCell, */
  Popover,
  Card,
  CardContent,
  Typography,
  Box,
  TableCell,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import CantCell from './CantCell.jsx';
import { useSelector } from 'react-redux';
import StockComp from './StockComponent.jsx';

export const CustomTableCell = ({ header, children, ...args }) => {
  return (
    <>
      <TableCell
        className="table-body-cell"
        sx={{
          fontSize: 'min(1.2vw, 15px)',
          textAlign: 'center',
          verticalAlign: 'middle',
        }}
        {...args}>
        {header !== 'Stock' && (
          <span className="cell-header">{header + ': '}</span>
        )}

        {children}
      </TableCell>
    </>
  );
};

const ProductRow = ({ product, headers }) => {
  const matchesMobile = useMediaQuery('(max-width:600px)');

  const stockDeProducto = product.codigo_red
    .map((item) => item.stock_dis)
    .reduce((a, b) => a + b, 0);

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
        (stockDeProducto > 5 && s === 'Mayor a 5') ||
        (stockDeProducto <= 5 && stockDeProducto > 0 && s === 'Menor a 5') ||
        (stockDeProducto <= 0 && s === 'Sin Stock'),
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    isFiltered(product, filterValues) && (
      <div className="table-row-conteiner">
        <TableRow className="product-row">
          <CustomTableCell valign="middle" align="center" header={headers[0]}>
            {product.codigo_red[0].codigo}
          </CustomTableCell>
          <CustomTableCell valign="middle" align="center" header={headers[1]}>
            {product.marca}
          </CustomTableCell>
          <CustomTableCell valign="middle" align="center" header={headers[2]}>
            {product.rubro}
          </CustomTableCell>
          <Popover
            anchorEl={anchorEl}
            sx={{
              pointerEvents: 'none',
              maxWidth: matchesMobile ? 'unset' : 'inherit',
            }}
            open={open}
            onClose={handlePopoverClose}
            anchorReference="anchorEl"
            anchorPosition={{ top: 0, left: 0 }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}>
            <Card
              sx={{
                width: matchesMobile ? '85vw' : '400px',
                maxWidth: matchesMobile ? 'unset' : 'inherit',
                display: 'flex',
                flexDirection: 'row',
              }}>
              {/* <CardMedia component={'image'} imageRendering={product.image} /> */}

              <img
                srcSet={product.image}
                alt={product.nombre}
                width={'40%'}
                height={'80%'}
              />

              <CardContent>
                <Typography>{product.descripcion}</Typography>
              </CardContent>
            </Card>
          </Popover>
          <CustomTableCell
            padding="none"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            header={headers[3]}>
            <Box
              sx={{
                backgroundColor: '#ff000024',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '7px 10px',
                border: 'solid 1px black',
                borderRadius: '10px',
                margin: 0,
              }}>
              {product.nombre}
            </Box>
          </CustomTableCell>

          <CustomTableCell valign="middle" align="center" header={headers[4]}>
            {new Intl.NumberFormat('es-AR', {
              style: 'percent',
              maximumFractionDigits: 2,
              minimumFractionDigits: 1,
            }).format(product.tasa_iva)}
          </CustomTableCell>
          <CustomTableCell padding="none" header={headers[5]}>
            <StockComp stock={stockDeProducto} />
          </CustomTableCell>
          {product && (
            <CantCell
              valign="middle"
              align="center"
              carrito={carrito}
              product={product}
              cant={prodInCarrito?.cant || 0}
              header={headers[6]}></CantCell>
          )}

          <CustomTableCell
            className="price-cell"
            valign="middle"
            align="center"
            sx={{ backgroundColor: '#df94942b', fontSize: 'min(1.2vw, 15px)' }}
            header={headers[7]}>
            {'$ ' +
              new Intl.NumberFormat('es-AR', {
                currency: 'ARG',
              }).format(product.precio_arg)}
          </CustomTableCell>
          <CustomTableCell
            className="price-cell"
            valign="middle"
            align="center"
            sx={{ backgroundColor: '#d6ffe6', fontSize: 'min(1.2vw, 15px)' }}
            header={headers[8]}>
            {
              '$ ' +
                new Intl.NumberFormat('es-AR', {
                  currency: 'ARG',
                  maximumFractionDigits: 0,
                }).format(product.precio_arg * (1 + product.tasa_iva) * 1.25) // Ver Cant!!!!
            }
          </CustomTableCell>
          <CustomTableCell
            className="price-cell"
            valign="middle"
            align="center"
            sx={{ backgroundColor: '#fdffd2', fontSize: 'min(1.2vw, 15px)' }}
            header={headers[9]}>
            {
              '$ ' +
                new Intl.NumberFormat('es-AR', {
                  currency: 'ARG',
                  maximumFractionDigits: 0,
                }).format(
                  product.precio_arg * (1 + product.tasa_iva) * 1.25 * 1.3,
                ) // Ver Cant!!!!
            }
          </CustomTableCell>
        </TableRow>
      </div>
    )
  );
};

export default ProductRow;
