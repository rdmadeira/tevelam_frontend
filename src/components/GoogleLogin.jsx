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
        const { email, name, sub } = jwtDecode(credentialResponse.credential);
        /* console.log('jwtDecode', jwtDecode(credentialResponse.credential));
        console.log(
          '"102764579276710548924"',
          jwtDecode(credentialResponse.credential.sub()),
        );
 */
        dispatch(
          getUserAction({
            ...credentialResponse,
            email,
            name,
            sub,
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
