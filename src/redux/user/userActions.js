export const GET_USER = 'GET_USER';

export const getUserAction = (user) => ({
  type: GET_USER,
  payload: user,
});
