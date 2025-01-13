export const GET_ORDERS = 'GET_ORDERS';
export const CREATE_ORDER = 'CREATE_ORDER';

export const getOrders = async (orders) => ({
  type: GET_ORDERS,
  payload: orders,
});
export const createOrder = async (order) => ({
  type: CREATE_ORDER,
  payload: order,
});