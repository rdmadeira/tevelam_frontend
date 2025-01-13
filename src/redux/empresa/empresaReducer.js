import { SWITCH_EMPRESA, GET_EMPRESA } from './cartActions';

export const cartReducer = (state = 'tevelam', action) => {
  switch (action.type) {
    case SWITCH_EMPRESA:
      return action.payload;
    case GET_EMPRESA:
      return action.payload;

    default:
      return state;
  }
};
