import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { getUserAction } from '../redux/user/userActions';

const GoogleLoginComp = () => {
  const dispatch = useDispatch();

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        dispatch(
          getUserAction({
            type: 'GET_USER',
            payload: { ...credentialResponse },
          }),
        );
      }}
      onError={(err) => {
        console.log('Login Failed', err);
      }}
      type="icon"
    />
  );
};

export default GoogleLoginComp;
