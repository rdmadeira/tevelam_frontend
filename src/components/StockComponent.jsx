import React from 'react';
import { Box } from '@mui/material';

const StockComp = ({ stock }) => {
  return (
    <Box>
      {stock > 5
        ? 'Mayor a 5'
        : stock <= 5 && stock > 0
          ? 'Menor a 5'
          : 'Sin Stock'}
    </Box>
  );
};
export default StockComp;
