import * as React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import OrderTable from './OrderTable.jsx';
import { useSelector } from 'react-redux';
import useAxios from '../hooks/useAxios.js';

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

  const handleClose = () => {
    setOpen(false);
  };

  const sendOrderHandler = () => {
    const orderToSend = {
      userId: user.clientId,
      headerForm: order.headerForm,
      carrito: carrito,
    };

    axiosInstance
      .post(`orders/create`, orderToSend)
      .then((response) => {
        setCreatedOrder(response.data.data);
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
        <DialogTitle id="scroll-dialog-title">Pedido: </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}></DialogContentText>
          <OrderTable />
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
      />
    </React.Fragment>
  );
};

export default OrderDialogConfirm;
