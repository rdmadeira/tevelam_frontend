import { GET_ORDERS, CREATE_ORDER } from './ordersActions.js';

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.payload;
    case CREATE_ORDER:
      return action.payload;
    default:
      return state;
  }
};

export default ordersReducer;
