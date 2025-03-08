import * as React from 'react';
import {
  Modal,
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  Alert,
  AlertTitle,
  Fade,
} from '@mui/material';
import TableHeaderRow from './TableHeaderRow.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CreatedOrderModal = ({ setOpen, open, createdOrder, subtotal }) => {
  const handleClose = () => {
    setOpen(false);
  };
  console.log('createdOrder', createdOrder);

  console.log('subtotal', subtotal);

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Fade in={open}>
          <Box sx={style}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Pedido grabado con suceso
            </Alert>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {'Pedido numero ' +
                createdOrder?.order.id +
                ' confirmado el ' +
                new Date(createdOrder?.order.iat).toLocaleDateString('es-AR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
            </Typography>
            <Divider />
            <TableContainer>
              <Table>
                <colgroup>
                  <col style={{ width: '30%' }} id="marca" />
                  <col style={{ width: '30%' }} id="nombre" />
                  <col style={{ width: '10%' }} id="cantidad" />
                  <col style={{ width: '30%' }} id="subtotal" />
                </colgroup>
                <TableHead>
                  <TableHeaderRow
                    headers={['Marca', 'Modelo', 'Cantidad', 'Subtotal']}
                  />
                </TableHead>

                <TableBody>
                  {createdOrder?.carrito.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell valign="middle" align="center">
                        {item.Producto.marca}
                      </TableCell>
                      <TableCell valign="middle" align="center">
                        {item.Producto.nombre}
                      </TableCell>
                      <TableCell valign="middle" align="center">
                        {item.cantidad}
                      </TableCell>
                      <TableCell valign="middle" align="center">
                        {'$ ' +
                          new Intl.NumberFormat('es-AR', {
                            currency: 'ARG',
                          }).format(item.cantidad * item.Producto.precio_arg)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell valign="middle" align="center"></TableCell>
                    <TableCell valign="middle" align="center">
                      Subtotal
                    </TableCell>
                    <TableCell valign="middle" align="center">
                      {'$ ' +
                        new Intl.NumberFormat('es-AR', {
                          currency: 'ARG',
                        }).format(subtotal)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default CreatedOrderModal;
