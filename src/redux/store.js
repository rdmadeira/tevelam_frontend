import {
  configureStore,
  applyMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import carritoReducer from './cart/cartReducer';
import ordersReducer from './cart/ordersReducer';
import empresaReducer from './cart/empresaReducer';

const logger = createLogger({ diff: true });
const rootReducer = combineReducers({
  carrito: carritoReducer,
  empresa: empresaReducer,
  order: ordersReducer,
});

export const store = configureStore(
  { reducer: rootReducer },
  applyMiddleware(logger)
);
