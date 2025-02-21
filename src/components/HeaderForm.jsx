import React from 'react';
import { Box } from '@mui/material';
import HeaderFormControl from './HeaderFormControl.jsx';

const HeaderForm = ({ ...args }) => {
  return (
    <Box
      component={'div'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        padding: '10px 0 20px 0',
      }}>
      <HeaderFormControl placeholder="Número cliente" type="text" />
      <HeaderFormControl placeholder="Cliente" type="text" />
      <HeaderFormControl placeholder="Condición %" type="number" />
      <HeaderFormControl placeholder="Observación" type="text" />
    </Box>
  );
};

export default HeaderForm;
