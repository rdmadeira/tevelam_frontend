import {
  SET_MARCAS,
  SET_RUBRO,
  SET_MODELO,
  SET_STOCK,
  SET_CANT,
  RESET_MARCAS,
  RESET_RUBRO,
  RESET_STOCK,
} from './filterActions.js';

const filterReducer = (
  state = { marcas: [], rubro: [], modelo: [], stock: [], cant: [] },
  action,
) => {
  switch (action.type) {
    case SET_MARCAS:
      return {
        ...state,
        marcas: action.payload,
      };
    case SET_RUBRO:
      return {
        ...state,
        rubro: action.payload,
      };
    case SET_MODELO:
      return {
        ...state,
        modelo: action.payload,
      };
    case SET_STOCK:
      return {
        ...state,
        stock: action.payload,
      };
    case SET_CANT:
      return { ...state, cant: action.payload };
    case RESET_MARCAS:
      return { ...state, marca: [] };
    case RESET_RUBRO:
      return { ...state, rubro: [] };
    case RESET_STOCK:
      return { ...state, stock: [] };
    default:
      return state;
  }
};

export default filterReducer;
