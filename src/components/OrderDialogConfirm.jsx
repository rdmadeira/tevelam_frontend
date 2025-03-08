import * as React from 'react';
import { useSelector } from 'react-redux';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import useAxios from '../hooks/useAxios.js';
import OrderTable from './OrderTable.jsx';
import SpinnerBackdrop from './MyBackdrop.jsx';
import CreatedOrderModal from './CreatedOrderModal.jsx';

const OrderDialogConfirm = ({
  open,
  scroll,
  descriptionElementRef,
  setOpen,
}) => {
  const [openCreatedOrderModal, setOpenCreatedOrderModal] =
    React.useState(false);
  const [createdOrder, setCreatedOrder] = React.useState(null);
  const { carrito, user, order } = useSelector((store) => store);
  const axiosInstance = useAxios(user);

  const [backdropOpen, setBackdropOpen] = React.useState(false);

  let subtotal = 0;
  carrito.forEach((item) => (subtotal += item.cant * item.precio_arg));

  const handleClose = () => {
    setOpen(false);
  };

  const sendOrderHandler = () => {
    const orderToSend = {
      userId: user.clientId,
      headerForm: order.headerForm,
      carrito: carrito,
      subtotal,
    };

    setBackdropOpen(true);
    axiosInstance
      .post(`orders/create`, orderToSend)
      .then((response) => {
        setCreatedOrder(response.data.data);
        console.log('response.data.data', response.data.data);
        setBackdropOpen(false);
        setOpenCreatedOrderModal(true);
        handleClose();
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        fullWidth
        maxWidth
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <SpinnerBackdrop
          backdropOpen={backdropOpen}
          color="inherit"
          size={40}
        />
        <DialogTitle id="scroll-dialog-title">Pedido: </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}></DialogContentText>
          <OrderTable subtotal={subtotal} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={sendOrderHandler}>Confirmar Pedido</Button>
        </DialogActions>
      </Dialog>
      <CreatedOrderModal
        open={openCreatedOrderModal}
        setOpen={setOpenCreatedOrderModal}
        createdOrder={createdOrder}
        subtotal={subtotal}
      />
    </React.Fragment>
  );
};

export default OrderDialogConfirm;
