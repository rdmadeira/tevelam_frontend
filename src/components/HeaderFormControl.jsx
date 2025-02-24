import React from 'react';

import { FormControl, Input } from '@mui/material';

const HeaderFormControl = ({ endAdornment, ...args }) => {
  /* const changeInputValueHandle = (event) => {
    event.preventDefault();
  }; */
  return (
    <FormControl
      sx={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
      required>
      <Input
        {...args}
        defaultValue={''}
        style={{
          border: 'none',
          width: '100%',
          textAlign: 'center',
          color: 'white',
          padding: '1%',
        }}
        /* onBlur={(e) => e.target.value > 0 && changeInputValueHandle(e)} */
        endAdornment={endAdornment}
      />
    </FormControl>
  );
};

export default HeaderFormControl;
