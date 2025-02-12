import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import carritoReducer from './cart/cartReducer.js';
import ordersReducer from './orders/ordersReducer.js';
import empresaReducer from './empresa/empresaReducer.js';
import userReducer from './user/userReducer.js';
// import persistReducer from 'redux-persist/es/persistReducer';

// const logger = createLogger({ diff: true });
const rootReducer = combineReducers({
  carrito: carritoReducer,
  empresa: empresaReducer,
  order: ordersReducer,
  user: userReducer,
});

/* *************************** Persist Reducer ************************************* */

const persistConfig = {
  key: 'root',
  blacklist: ['carrito', 'user'],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  /* devTools: true, */ // Defaults to true
});

export const persistor = persistStore(store);
