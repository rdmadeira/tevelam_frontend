import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, InputAdornment } from '@mui/material';
import PercentIcon from '@mui/icons-material/Percent';
import CreateIcon from '@mui/icons-material/Create';
import SpinnerBackdrop from './MyBackdrop.jsx';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import HeaderFormControl from './HeaderFormControl.jsx';
import * as orderActions from '../redux/orders/ordersActions.js';

function formReducer(state, action) {
  switch (action.type) {
    case 'change_input': {
      return {
        ...action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
}

const HeaderForm = ({ handleClickOpen }) => {
  const carrito = useSelector((store) => store.carrito);
  const user = useSelector((store) => store.user);
  const [formState, formDispatch] = React.useReducer(formReducer, {
    numerocliente: '',
    cliente: '',
    condicion: '',
    obs: '',
  });

  const dispatch = useDispatch();

  const submitHandle = () => {
    const order = {
      carrito,
      user,
      headerForm: formState,
    };

    handleClickOpen('body');

    dispatch(orderActions.createOrder(order));
  };

  const inputBlurHandle = (event) => {
    formDispatch({
      type: 'change_input',
      payload: { ...formState, [event.target.name]: event.target.value },
    });
  };

  return (
    <>
      <SpinnerBackdrop />
      <form id="order-form">
        <Box
          component={'div'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: '10px 0 20px 0',
          }}>
          <HeaderFormControl
            onBlur={(e) => inputBlurHandle(e)}
            placeholder="Número cliente"
            type="text"
            name="numerocliente"
            endAdornment={
              <InputAdornment position="start">
                <CreateIcon />
              </InputAdornment>
            }
          />
          <HeaderFormControl
            onBlur={(e) => inputBlurHandle(e)}
            placeholder="Cliente"
            type="text"
            name="cliente"
            endAdornment={
              <InputAdornment position="start">
                <CreateIcon />
              </InputAdornment>
            }
          />
          <HeaderFormControl
            onBlur={(e) => inputBlurHandle(e)}
            placeholder="Condición %"
            type="number"
            name="condicion"
            endAdornment={
              <InputAdornment position="start">
                <PercentIcon />
              </InputAdornment>
            }
          />
          <HeaderFormControl
            onBlur={(e) => inputBlurHandle(e)}
            placeholder="Observación"
            type="text"
            name="obs"
            required={false}
            endAdornment={
              <InputAdornment position="start">
                <CreateIcon />
              </InputAdornment>
            }
          />
        </Box>
        <Button
          onClick={() => {
            submitHandle();
          }}
          style={{
            background: '#deb887',
          }}
          startIcon={<ShoppingCartCheckoutIcon sx={{ marginLeft: '5px' }} />}>
          Enviar Pedido
        </Button>
        {/* <Button type="submit">Confirmar Pedido</Button> */}
      </form>
    </>
  );
};

export default HeaderForm;
