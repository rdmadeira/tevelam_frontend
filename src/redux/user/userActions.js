export const GET_USER = 'GET_USER';
export const NO_USER = 'NO_USER';

export const getUserAction = (user) => ({
  type: GET_USER,
  payload: user,
});

export const signOutAction = () => ({
  type: NO_USER,
  payload: null,
});
