import React from 'react';
import { useGoogleOneTapLogin } from '@react-oauth/google';

//import { GoogleAuthProvider, signInWithRedirect, getAuth } from 'firebase/auth';

//import { firebaseApp } from '../firebase/firebaseapp';

const useAuth = () => {
  const [user, setUser] = React.useState(null);

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
      setUser(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
  });
  return user;
};

export default useAuth;
