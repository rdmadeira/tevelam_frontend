import React from 'react';

import { useDispatch } from 'react-redux';

import * as cartActions from '../redux/cart/cartActions';

import { CustomTableCell } from '../components/ProductRow.jsx';

const CantCell = ({ product, carrito, cant, ...args }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (carrito.length === 0) {
      document.getElementById('cant_form' + product.id).reset();
    }
  }, [carrito, product]);

  const changeNumberHandle = (event) => {
    event.preventDefault();

    const existentItem = carrito.find((item) => item.id === product.id);

    if (
      (existentItem && parseInt(event.target.value) === 0) ||
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
    <CustomTableCell {...args}>
      <form
        style={{ height: '100%' }}
        onSubmit={(e) => e.preventDefault()}
        id={'cant_form' + product.id}>
        <input
          type="number"
          defaultValue={cant}
          style={{
            border: 'none',
            height: '100%',
            textAlign: 'center',
            width: '100%',
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
