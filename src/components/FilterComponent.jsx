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
          sx={{ padding: 0, fontSize: '0.5rem' }}
        />
      )}
      onChange={(e, nv) => handleChange(e, nv)}>
      {/* <InputLabel id="select-label">{column}</InputLabel>
      <Select
        labelId="select-label"
        id="simple-select"
        value={value}
        label={column}
        multiple
        onChange={(e) => handleChange(e)}>
        {itemsToSelect?.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select> */}
    </Autocomplete>
  );
};

export default FilterComponent;
