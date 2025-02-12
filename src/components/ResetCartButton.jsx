import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import * as cartActions from '../redux/cart/cartActions';

const ResetCartButton = ({ product, ...args }) => {
  const dispatch = useDispatch();

  const resetCartHandle = (value) => {
    dispatch(cartActions.resetCartAction());
  };
  return <Button onClick={resetCartHandle}>ResetCart</Button>;
};

export default ResetCartButton;
