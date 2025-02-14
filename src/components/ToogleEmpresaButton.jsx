/* import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import * as empresaActions from '../redux/empresa/empresaActions';

const ToogleEmpresaButton = ({ empresa, ...args }) => {
  const dispatch = useDispatch();

  const toogleEmpresaHandle = (value) => {
    dispatch(empresaActions.switchEmpresaAction(empresa));
  };
  return <Button onClick={toogleEmpresaHandle}>Cambiar Empresa</Button>;
};

export default ToogleEmpresaButton;
 */
