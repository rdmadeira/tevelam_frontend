export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const RESET_CART = 'RESET_CART';

export const addItemToCartAction = (updatedCart) => ({
  type: ADD_ITEM_TO_CART,
  payload: updatedCart,
});
export const updateCartAction = (updatedCart) => ({
  type: UPDATE_CART,
  payload: updatedCart,
});
export const resetCartAction = () => ({
  type: RESET_CART,
});
