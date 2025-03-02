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
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CreatedOrderModal = ({ setOpen, open, createdOrder }) => {
  const handleClose = () => {
    setOpen(false);
  };
  console.log('createdOrder', createdOrder);

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
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
          {createdOrder?.carrito.map((item) => (
            <Table key={item.id}>
              <TableBody>
                <TableRow>
                  <TableCell>{item.Producto.marca}</TableCell>
                  <TableCell>{item.Producto.nombre}</TableCell>
                  <TableCell>{item.cantidad}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default CreatedOrderModal;
