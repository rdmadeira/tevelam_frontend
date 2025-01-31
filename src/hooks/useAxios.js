import React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const useAxios = (entidad = undefined) => {
  const axiosCachedInstance = React.useMemo(() => {
    const axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: process.env.REACT_APP_API_BASE_URL,
    });

    axiosInstance.interceptors.request.use((config) => {
      const localStorageToken =
        /* localStorage.getItem('authTvl') */
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzMzdiZTYzNjRmMzgyNDAwOGQwZTkwMDNmNTBiYjZiNDNkNWE5YzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMjU1NTk0MDU1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMyNTU1OTQwNTU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA3OTY5MzY3MzEwMjQ5NjAxMjA2IiwiZW1haWwiOiJyZG1hZGVpcmEyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVDViQ1JmUG5Nd3BqZ3B0WXFYT0tWQSIsImlhdCI6MTczODExNTQxMCwiZXhwIjoxNzM4MTE5MDEwfQ.atRGPp-kjoRIV0hs8TwqaeqKkPFBBOL5HzX7_CSGDsyvxK7P8ytpwOc_gq_qgo9JA9y6CuS-QQxdmG4__3JqaB6w8QM3h29mG31tH3isUMzgzzXQl8m-_s6HUkHmcajMyRMxapDlh-mT_k3AORJ5sWdowRUPBKM3WMXhFQZBbsFq8X8IaPEvAZnK4SzwgoVpCt9q8hjrtiJoVNpXjor3NknWXestBIu8h2aVwIOIzLN4MciYXbFN0sczIJGuBodI5Dc0sSGz6v2sEQnJU1vNlEbFtbZw3pxNJMMFE3zB1dRIJEwGD_iG4Kcc1DbRh5KoEpcgYFbFtnIhFOh2HTRbeg';
      const payload = {
        iat: Math.floor(Date.now() / 1000),
        token: localStorageToken,
      };
      const token = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET, {
        expiresIn: 60 * 60,
      });
      if (token) config.headers.Authorization = 'Bearer ' + token;
    });
  }, []);
  return axiosCachedInstance;
};

export default useAxios;
