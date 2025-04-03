import React from 'react';
import {
  TableRow,
  TableCell,
  Popover,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import CantCell from './CantCell.jsx';
import { useSelector } from 'react-redux';
import StockComp from './StockComponent.jsx';

const ProductRow = ({ product }) => {
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
        <Popover
          anchorEl={anchorEl}
          sx={{ width: '60%', pointerEvents: 'none' }}
          open={open}
          onClose={handlePopoverClose}
          anchorReference="anchorEl"
          anchorPosition={{ top: 0, left: 0 }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}>
          <Card sx={{ width: '400px', display: 'flex', flexDirection: 'row' }}>
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
        <TableCell
          valign="middle"
          align="center"
          padding="none"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true">
          <Box
            sx={{
              backgroundColor: '#ff000024',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              /* padding: '10px 10px', */
              height: '55px',
              border: 'solid 1px black',
              borderRadius: '10px',
              margin: 0,
            }}>
            <Typography>{product.nombre}</Typography>
          </Box>
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
          /*  sx={{
            width: '10%',
          }} */
        >
          <StockComp stock={stockDeProducto} />
        </TableCell>
        {product && (
          <CantCell
            valign="middle"
            align="center"
            carrito={carrito}
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
