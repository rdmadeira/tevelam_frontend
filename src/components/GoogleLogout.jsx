import React from 'react';
import { googleLogout } from '@react-oauth/google';

import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch } from 'react-redux';
import * as userActions from '../redux/user/userActions';

const GoogleLogoutComp = ({ empresa, ...args }) => {
  const dispatch = useDispatch();
  const logoutHandle = () => {
    googleLogout();
    dispatch(userActions.signOutAction());
  };

  return (
    <Button
      variant="contained"
      color={empresa === 'tevelam' ? 'error' : 'info'}
      startIcon={<GoogleIcon />}
      onClick={logoutHandle}
      {...args}>
      Logout
    </Button>
  );
};

export default GoogleLogoutComp;
