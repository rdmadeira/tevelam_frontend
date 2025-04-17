import React from 'react';

import { useDispatch } from 'react-redux';

import * as cartActions from '../redux/cart/cartActions';

import { CustomTableCell } from '../components/ProductRow.jsx';
import { Typography, Tooltip } from '@mui/material';

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

    if (
      Number.isInteger(Number(event.target.value)) ===
        false /* isNaN(event.target.value) */ ||
      event.target.value < 0
    ) {
      setCantError(true);
    } else {
      setCantError(false);
    }
    const existentItem = carrito.find((item) => item.id === product.id);

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
  return cantError ? (
    <Tooltip title="Solamente numeros enteros!" placement="right-start" arrow>
      <CustomTableCell
        {...args}
        sx={{
          padding: 0,
          border: cantError && 'solid 2px #d80f0f',
          position: 'relative',
        }}>
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

            style={{
              border: 'none',
              height: '100%',
              textAlign: 'center',
              width: '5vw',
              padding: '10%',
              fontSize: 'min(1.2vw, 15px)',
              backgroundColor: cantError && '#ffeded',
            }}
            onBlur={(e) => changeNumberHandle(e)}
          />
        </form>
      </CustomTableCell>
    </Tooltip>
  ) : (
    <CustomTableCell
      {...args}
      sx={{
        padding: 0,
        border: cantError && 'solid 2px #ffc9c9',
        position: 'relative',
      }}>
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
            backgroundColor: cantError && '#ffc9c9',
          }}
          onBlur={(e) => changeNumberHandle(e)}
        />
      </form>
    </CustomTableCell>
  );
};

export default CantCell;
