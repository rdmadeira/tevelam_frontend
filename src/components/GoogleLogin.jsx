import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { getUserAction } from '../redux/user/userActions';

const GoogleLoginComp = () => {
  const dispatch = useDispatch();

  return (
    <GoogleLogin
      size="large"
      shape="circle"
      onSuccess={(credentialResponse) => {
        console.log('credentialResponse', credentialResponse);

        dispatch(
          getUserAction({ ...credentialResponse, iat: Date.now() / 1000 }),
        );
      }}
      onError={(err) => {
        console.log('Login Failed', err);
        return {
          error: err.message,
        };
      }}
      type="standard"
      text="continue_with"
      use_fedcm_for_prompt={false}
      useOneTap
    />
  );
};

export default GoogleLoginComp;
