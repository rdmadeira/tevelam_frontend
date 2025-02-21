export const SET_MARCAS = 'SET_MARCAS';
export const SET_RUBRO = 'SET_RUBRO';
export const SET_MODELO = 'SET_MODELO';
export const SET_STOCK = 'SET_STOCK';
export const SET_CANT = 'SET_CANT';
export const RESET_CANT = 'RESET_CANT';
export const RESET_MARCAS = 'RESET_MARCAS';
export const RESET_RUBRO = 'RESET_RUBRO';
export const RESET_STOCK = 'RESET_STOCK';

export const setMarca = (marcas) => ({
  type: SET_MARCAS,
  payload: marcas,
});
export const setRubro = (rubros) => ({
  type: SET_RUBRO,
  payload: rubros,
});
export const setModelo = (modelos) => ({
  type: SET_MODELO,
  payload: modelos,
});
export const setStock = (stocks) => ({
  type: SET_STOCK,
  payload: stocks,
});
export const setCant = (cant) => ({
  type: SET_CANT,
  payload: cant,
});

export const resetMarca = () => ({
  type: RESET_MARCAS,
  payload: [],
});
export const resetRubro = () => ({
  type: RESET_RUBRO,
  payload: [],
});
export const resetStock = () => ({
  type: RESET_STOCK,
  payload: [],
});

export const resetCant = () => ({
  type: RESET_CANT,
  payload: [],
});
