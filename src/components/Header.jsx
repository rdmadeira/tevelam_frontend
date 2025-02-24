import React from 'react';
import { Box, Alert } from '@mui/material';

import GoogleLoginComp from './GoogleLogin.jsx';
import HeaderForm from './HeaderForm.jsx';
import GoogleLogoutComp from './GoogleLogout.jsx';
import ResetCartButton from './ResetCartButton.jsx';

const Header = ({ empresa, user }) => {
  return (
    <Box
      sx={{
        display: 'Flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: empresa === 'tevelam' ? '#ee1c24' : '#4b4b4d',
        padding: '10px 20px 10px 20px',
      }}>
      {
        <>
          <Box
            component={'div'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundImage:
                empresa === 'tevelam'
                  ? `url(/assets/tevelam_6.jpg)`
                  : `url(/assets/discopro.png)`,
              /* backgroundSize: '100%', */
              backgroundPositionY: 'center',
              backgroundRepeat: 'no-repeat',
              width: '300px',
              height: '200px',

              paddingLeft: '0px',
              paddingRight: '0px',
            }}></Box>
          {user && (
            <Box>
              <Alert
                /* icon={false} */ /* severity="info" */
                color={empresa === 'tevelam' ? 'error' : 'info'}
                variant="filled">
                {'Lista del ' +
                  new Date(Date.now()).toLocaleDateString('es-AR')}
              </Alert>
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
              <HeaderForm />
            </Box>
          )}
        </>
      }
    </Box>
  );
};

export default Header;
