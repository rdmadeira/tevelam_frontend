import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, InputAdornment } from '@mui/material';
import PercentIcon from '@mui/icons-material/Percent';
import CreateIcon from '@mui/icons-material/Create';

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

const HeaderForm = ({ ...args }) => {
  const carrito = useSelector((store) => store.carrito);
  const user = useSelector((store) => store.user);
  const [formState, formDispatch] = React.useReducer(formReducer, {
    numerocliente: '',
    cliente: '',
    condicion: '',
    obs: '',
  });

  const dispatch = useDispatch();
  console.log('formState', formState);

  const submitHandle = (e) => {
    e.preventDefault();

    const order = {
      carrito,
      user,
      headerForm: formState,
    };
    dispatch(orderActions.createOrder(order));
  };

  const inputBlurHandle = (event) => {
    console.log('event.target', event.target.name);

    formDispatch({
      type: 'change_input',
      payload: { ...formState, [event.target.name]: event.target.value },
    });
  };

  return (
    <form id="order-form" onSubmit={(e) => submitHandle(e)}>
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
      <Button type="submit">Confirmar Pedido</Button>
    </form>
  );
};

export default HeaderForm;
