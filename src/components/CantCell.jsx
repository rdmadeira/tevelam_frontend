import React from 'react';

import { useDispatch } from 'react-redux';

import * as cartActions from '../redux/cart/cartActions';

import { CustomTableCell } from '../components/ProductRow.jsx';
import { Typography } from '@mui/material';

const CantCell = ({ product, carrito, cant, ...args }) => {
  const dispatch = useDispatch();
  const [cantError, setCantError] = React.useState(false);

  React.useEffect(() => {
    if (carrito.length === 0) {
      document.getElementById('cant_form' + product.id).reset();
    }
  }, [carrito, product]);

  const changeNumberHandle = (event) => {
    event.preventDefault();

    const existentItem = carrito.find((item) => item.id === product.id);

    if (isNaN(event.target.value) || event.target.value < 0) {
      setCantError(true);
    } else {
      setCantError(false);
    }

    if (
      (existentItem && event.target.value === 0) ||
      event.target.value === ''
    ) {
      dispatch(cartActions.deleteItemToCart(existentItem?.id));
    } else if (existentItem && event.target.value > 0) {
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
      event.target.value > 0 &&
        dispatch(
          cartActions.addItemToCartAction({
            ...product,
            cant: parseInt(event.target.value),
          }),
        );
    }
  };
  return (
    <CustomTableCell
      {...args}
      sx={{
        padding: 0,
        border: cantError && 'red 1px solid',
        position: 'relative',
      }}>
      {cantError && (
        <Typography
          color="red"
          fontSize={'max(0.5vw,8px)'}
          position={'absolute'}
          top={0}
          left={0}>
          Solamente numeros no negativos!
        </Typography>
      )}
      <form
        style={{ height: '100%' }}
        onSubmit={(e) => e.preventDefault()}
        id={'cant_form' + product.id}>
        <label htmlFor="cantidad_input" style={{ display: 'none' }}>
          ok
        </label>
        <input
          id="cantidad_input"
          type="text"
          inputMode="numeric"
          onFocus={(e) => e.target.select()}
          defaultValue={cant}
          /* value={0} */
          className="[&::-webkit-inner-spin-button]:appearance-none"
          style={{
            border: 'none',
            height: '100%',
            textAlign: 'center',
            width: '5vw',
            padding: '10%',
            fontSize: 'min(1.2vw, 15px)',
          }}
          onBlur={(e) => changeNumberHandle(e)}
        />
      </form>
    </CustomTableCell>
  );
};

export default CantCell;
