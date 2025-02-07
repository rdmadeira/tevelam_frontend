import { GET_USER } from './userActions.js';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...action.payload };

    default:
      return state;
  }
};

export default userReducer;
