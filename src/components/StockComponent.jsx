import React from 'react';
import { Box } from '@mui/material';

const StockComp = ({ stock }) => {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        padding: '3px 10px',
        backgroundColor:
          stock > 5
            ? '#8adc8a'
            : stock <= 5 && stock > 0
              ? '#f2f29a'
              : '#f9a5a5',
      }}>
      {stock > 5
        ? 'Mayor a 5'
        : stock <= 5 && stock > 0
          ? 'Menor a 5'
          : 'Sin Stock'}
    </Box>
  );
};
export default StockComp;
