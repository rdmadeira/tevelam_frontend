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
      //const localStorageToken =
      /* localStorage.getItem('authTvl') */

      const payload = {
        iat: Math.floor(Date.now() / 1000),
        credential: user?.credential,
        clientId: user?.clientId,
      };

      const secret = new TextEncoder().encode(process.env.REACT_APP_JWT_SECRET);
      const jwtoken = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(secret);

      /* const privateKey = crypto.createPrivateKey(   // Cuando compila para web, crypto no existe, porque es de Node
        process.env.REACT_APP_JWT_SECRET,
      ); */
      /* typeof window !== 'undefined'
          ? await window.crypto.subtle.generateKey(
              {
                name: 'HMAC',
                hash: { name: 'SHA-256' },
              },
              true,
              ['sign', 'verify'],
            )
          : await crypto.subtle.generateKey(
              {
                name: 'HMAC',
                hash: { name: 'SHA-256' },
              },
              true,
              ['sign', 'verify'],
            );
 */
      //const privatekey = createPrivateKey(process.env.REACT_APP_JWT_SECRET);

      // const token = jwt.sign(payload, pairKey, {
      //   expiresIn: 3600,
      //   algorithm: ['RS256'],
      //   allowInsecureKeySizes: true,
      //   /* allowInsecureKeySizes: true,
      //   allowInvalidAsymmetricKeyTypes: true,
      //   algorithm: ['none'], */
      // });
      // console.log('token', token);

      config.data = secret;
      if (jwtoken) {
        config.headers.Authorization = 'Bearer ' + jwtoken;
      }
      return config;
    });
    return axiosInstance;
  }, [user?.credential, user?.clientId]);
  return axiosCachedInstance;
};

export default useAxios;
