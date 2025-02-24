import { GET_USER, NO_USER } from './userActions.js';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...action.payload };
    case NO_USER:
      return null;

    default:
      return state;
  }
};

export default userReducer;
