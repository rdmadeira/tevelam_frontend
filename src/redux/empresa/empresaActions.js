export const SWITCH_EMPRESA = 'SWITCH_EMPRESA';
export const GET_EMPRESA = 'GET_EMPRESA';

export const getEmpresaAction = () => ({
  type: GET_EMPRESA,
});

export const switchEmpresaAction = () => ({
  type: SWITCH_EMPRESA,
  payload: 'tevelam' ? 'discopro' : 'tevelam',
});
