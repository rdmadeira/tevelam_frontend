import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

import * as cartActions from '../redux/cart/cartActions';

const ResetCartButton = ({ product, ...args }) => {
  const dispatch = useDispatch();

  const resetCartHandle = (value) => {
    dispatch(cartActions.resetCartAction());
  };
  return (
    <Button
      startIcon={<RemoveShoppingCartIcon />}
      onClick={resetCartHandle}
      variant="contained"
      color="error"
      {...args}>
      ResetCart
    </Button>
  );
};

export default ResetCartButton;
