import React from 'react';
import { Box, Alert, useMediaQuery } from '@mui/material';

import GoogleLoginComp from './GoogleLogin.jsx';
import HeaderForm from './HeaderForm.jsx';
import GoogleLogoutComp from './GoogleLogout.jsx';
import ResetCartButton from './ResetCartButton.jsx';
import useAxios from '../hooks/useAxios.js';

const Header = ({ empresa, user, handleClickOpen, isAdmin }) => {
  const axiosInstance = useAxios(user);
  const refInput = React.useRef(null);
  const matchesMobile = useMediaQuery('(max-width:600px)');

  const handleSendFile = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    axiosInstance
      .post('products/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <Box
      sx={{
        display: 'Flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: empresa === 'tevelam' ? '#3d0000' : '#4b4b4d',
        /*  backgroundImage:
          empresa === 'tevelam' &&
          !matchesMobile &&
          `url(/assets/tevelam_4.jpg)`, */
        backgroundSize: matchesMobile ? '40%' : '111%',
        backgroundPositionX: matchesMobile ? 'left' : 'center',
        backgroundBlendMode: 'exclusion',
        padding: '10px 20px 10px 20px',
      }}>
      {
        <>
          {!matchesMobile && (
            <Box
              component={'div'}
              sx={{
                display: 'flex',
                backgroundImage:
                  empresa === 'tevelam'
                    ? `url(/assets/tevelam_3.jpg)`
                    : `url(/assets/discopro.png)`,
                backgroundColor: empresa === 'tevelam' && '#524949',
                backgroundBlendMode: 'exclusion',
                backgroundPositionY: 'center',
                backgroundRepeat: 'no-repeat',
                width: '300px',
                height: '200px',

                paddingLeft: '0px',
                paddingRight: '0px',
              }}></Box>
          )}
          {user && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: matchesMobile ? '40%' : 'inherit',
              }}>
              <Alert
                sx={{
                  fontSize: matchesMobile && '0.7rem',
                  padding: matchesMobile ? '5px 15px' : '5px 10px',
                  width: 'min-content',
                }}
                color={empresa === 'tevelam' ? 'error' : 'info'}
                variant="filled">
                {'Lista del ' +
                  new Date(Date.now()).toLocaleDateString('es-AR')}
              </Alert>
              {isAdmin && (
                <form
                  onSubmit={(e) => handleSendFile(e)}
                  action="http://127.0.0.1:5001/tevelam-5c6b4/us-central1/tevelamFunctions/api/v1/products/update"
                  encType="multipart/form-data"
                  method="POST"
                  id="fileForm">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    ref={refInput}
                    style={{ width: matchesMobile ? '90%' : 'inherit' }}
                    // onChange={(event) => handleSendFile(event)}
                  />
                  <button type="submit" form="fileForm">
                    Enviar
                  </button>
                </form>
              )}
            </Box>
          )}
          {!user && (
            <Box sx={{ marginTop: '20px' /* , paddingRight: '10px' */ }}>
              <GoogleLoginComp />
            </Box>
          )}
          {user && (
            <Box
              sx={{ width: matchesMobile ? '60%' : '30%', textAlign: 'end' }}>
              <Box
                sx={{
                  display: 'flex',
                  columnGap: '20px',
                  justifyContent: 'flex-end',
                }}>
                <ResetCartButton
                  sx={{
                    width: matchesMobile ? ' max-content' : 'inherit',
                    fontSize: matchesMobile && '0.5rem',
                  }}
                />
                <GoogleLogoutComp
                  empresa={empresa}
                  sx={{
                    width: matchesMobile ? ' max-content' : 'inherit',
                    fontSize: matchesMobile && '0.5rem',
                  }}
                />
              </Box>
              <HeaderForm
                handleClickOpen={handleClickOpen}
                matchesMobile={matchesMobile}
              />
            </Box>
          )}
        </>
      }
    </Box>
  );
};

export default Header;
