import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';

import * as filterActions from '../redux/filter/filterActions.js';

const FilterComponent = ({ column, itemsToSelect, matchesMobile, ...args }) => {
  const [value, setValue] = React.useState([]);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (column === 'Marca') dispatch(filterActions.setMarca(newValue));
    else if (column === 'Rubro') dispatch(filterActions.setRubro(newValue));
    else if (column === 'Modelo') dispatch(filterActions.setModelo(newValue));
    else if (column === 'Stock') dispatch(filterActions.setStock(newValue));
    else if (column === 'Cant') dispatch(filterActions.setCant(newValue));
  };
  return (
    <Autocomplete
      fullWidth={matchesMobile ? false : true}
      multiple
      id="tags-outlined"
      options={itemsToSelect}
      value={value}
      filterSelectedOptions
      {...args}
      sx={{ padding: '0' }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={column}
          placeholder={column}
          size={matchesMobile && 'small'}
          sx={{ padding: 0, fontSize: 'min(1.2vw, 15px)' }}
        />
      )}
      onChange={(e, nv) => handleChange(e, nv)}></Autocomplete>
  );
};

export default FilterComponent;
