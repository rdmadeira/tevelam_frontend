import React from 'react';
import { Box, Alert, Button } from '@mui/material';

import GoogleLoginComp from './GoogleLogin.jsx';
import HeaderForm from './HeaderForm.jsx';
import GoogleLogoutComp from './GoogleLogout.jsx';
import ResetCartButton from './ResetCartButton.jsx';
import useAxios from '../hooks/useAxios.js';

const Header = ({ empresa, user, handleClickOpen, isAdmin }) => {
  const axiosInstance = useAxios(user);
  const refInput = React.useRef(null);

  const handleSendFile = (event) => {
    event.preventDefault();
    // console.log('formData', formData);

    /* console.log('e.t.files[0]', event.target.files[0]);
    let fileBlob;
    event.target.files[0].arrayBuffer().then((resp) => {
      fileBlob = resp;
      console.log('fileBlob', fileBlob);
      }); */
    console.log('event.target', event.target);

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
        backgroundColor: empresa === 'tevelam' ? '#c46464' : '#4b4b4d',
        backgroundImage: empresa === 'tevelam' && `url(/assets/tevelam_4.jpg)`,
        backgroundSize: '111%',
        backgroundPositionX: 'center',
        backgroundBlendMode: 'exclusion',
        padding: '10px 20px 10px 20px',
      }}>
      {
        <>
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
          {user && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Alert
                /* icon={false} */ /* severity="info" */
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
            <Box sx={{ width: '30%', textAlign: 'end' }}>
              <Box
                sx={{
                  display: 'flex',
                  columnGap: '20px',
                  justifyContent: 'flex-end',
                }}>
                <ResetCartButton />
                <GoogleLogoutComp empresa={empresa} />
              </Box>
              <HeaderForm handleClickOpen={handleClickOpen} />
            </Box>
          )}
        </>
      }
    </Box>
  );
};

export default Header;
