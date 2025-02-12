import React from 'react';
import { TableCell } from '@mui/material';
import { useDispatch } from 'react-redux';

import * as cartActions from '../redux/cart/cartActions';

const CantCell = ({ product, carrito, setCant, ...args }) => {
  const dispatch = useDispatch();

  const changeNumberHandle = (event) => {
    event.preventDefault();
    setCant(event.target.value);
    const existentItem = carrito.find((item) => item.id === product.id);
    if (existentItem) {
      const updatedCart = carrito.map((item) => {
        if (item.id === existentItem.id)
          return {
            ...item,
            cant: parseInt(event.target.value),
          };
        return { ...item };
      });
      dispatch(cartActions.updateCartAction(updatedCart));
    } else {
      dispatch(
        cartActions.addItemToCartAction({
          ...product,
          cant: parseInt(event.target.value),
        }),
      );
    }
  };
  return (
    <TableCell {...args}>
      <form style={{ height: '100%' }} onSubmit={(e) => e.preventDefault()}>
        <input
          type="number"
          defaultValue={0}
          style={{
            border: 'none',
            height: '100%',
            textAlign: 'center',
            width: '6vw',
            padding: '10%',
          }}
          onBlur={(e) => e.target.value > 0 && changeNumberHandle(e)}
        />
      </form>
    </TableCell>
  );
};

export default CantCell;
