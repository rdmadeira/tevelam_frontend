import { SWITCH_EMPRESA, GET_EMPRESA } from './empresaActions.js';

const empresaReducer = (state = 'tevelam', action) => {
  switch (action.type) {
    case SWITCH_EMPRESA:
      return action.payload;
    case GET_EMPRESA:
      return action.payload;

    default:
      return state;
  }
};

export default empresaReducer;
