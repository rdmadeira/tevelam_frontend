import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { getUserAction } from '../redux/user/userActions';

const GoogleLoginComp = () => {
  const dispatch = useDispatch();

  return (
    <GoogleLogin
      size="large"
      shape="circle"
      onSuccess={(credentialResponse) => {
        const { email, name } = jwtDecode(credentialResponse.credential);

        dispatch(
          getUserAction({
            ...credentialResponse,
            email,
            name,
            iat: Date.now() / 1000,
          }),
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
