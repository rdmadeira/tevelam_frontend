import React from 'react';
import axios from 'axios';
import * as jose from 'jose';
// import crypto from 'crypto';

const useAxios = (user) => {
  const axiosCachedInstance = React.useMemo(() => {
    const axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: process.env.REACT_APP_API_BASE_URL,
    });

    axiosInstance.interceptors.request.use(async (config) => {
      const payload = {
        iat: user?.iat,
        credential: user?.credential,
        clientId: user?.clientId,
      };

      try {
        const secret = new TextEncoder().encode(
          process.env.REACT_APP_JWT_SECRET,
        );

        const jwtoken = await new jose.SignJWT(payload)
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('1h')
          .sign(secret);

        //config.data = secret;
        if (jwtoken) {
          config.headers.Authorization = 'Bearer ' + jwtoken;
        }

        return config;
      } catch (error) {
        console.log('error', error);
      }
    });

    return axiosInstance;
  }, [user?.credential, user?.clientId, user?.iat]);
  return axiosCachedInstance;
};

export default useAxios;
