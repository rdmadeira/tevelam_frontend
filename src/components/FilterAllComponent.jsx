import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

function useDebouncedValue(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const FilterAllComponent = ({ products, setFilteredProducts }) => {
  const [valor, setValor] = React.useState('');
  const valorDebounced = useDebouncedValue(valor, 600); // <- debounce

  const filtered = React.useMemo(() => {
    const textoNormalizado = valorDebounced.toLowerCase();

    return products.filter((obj) => {
      return Object.entries(obj)
        .filter(([key]) => key !== 'image' && key !== 'descripcion')
        .map(([_, val]) => val)
        .some((val) => String(val).toLowerCase().includes(textoNormalizado));
    });
  }, [products, valorDebounced]);

  React.useEffect(() => {
    setFilteredProducts(filtered);
  }, [filtered, setFilteredProducts]);

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      label="Buscar..."
      size="small"
      variant="outlined"
      value={valor}
      onChange={(e) => setValor(e.target.value)}></TextField>
  );
};

export default FilterAllComponent;
