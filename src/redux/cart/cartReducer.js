import {
  ADD_ITEM_TO_CART,
  UPDATE_CART,
  RESET_CART,
  DELETE_ITEM,
} from './cartActions';

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...state, action.payload];
    case UPDATE_CART:
      return [...action.payload];
    case RESET_CART:
      return [];
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default cartReducer;
