import React from 'react';

import * as cartActions from '../redux/cart/cartActions';
import { FormControl, Input } from '@mui/material';

const HeaderFormControl = ({ ...args }) => {
  const changeInputValueHandle = (event) => {
    event.preventDefault();
  };
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
          width: '80%',
          textAlign: 'center',

          padding: '1%',
        }}
        onBlur={(e) => e.target.value > 0 && changeInputValueHandle(e)}
      />
    </FormControl>
  );
};

export default HeaderFormControl;
