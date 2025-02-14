import React from 'react';
import {
  Drawer,
  Button,
  Container,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import queryString from 'query-string';

// import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import GoogleLoginComp from './GoogleLogin.jsx';
import ResetCartButton from './ResetCartButton.jsx';
import HeaderForm from './HeaderForm.jsx';
/* import ToogleEmpresaButton from './ToogleEmpresaButton.jsx'; */

import TableComp from './Table.jsx';

const Main = () => {
  const user = useSelector((state) => state.user);

  const [open, setOpen] = React.useState(false);

  const [products, setProducts] = React.useState(null);

  const [empresa, setEmpresa] = React.useState(null);
  console.log('empresa', empresa);

  const axiosInstance = useAxios(user || { clientId: null, credential: null });

  React.useEffect(() => {
    const queryObj = queryString.parse(window.location.search);
    setEmpresa(queryObj.focus || 'tevelam');
    const entidad = `products/?empresa=${empresa}&iscurrent=true`;

    user &&
      axiosInstance.get(entidad).then((value) => {
        setProducts(value.data.data);
      });
  }, [user, axiosInstance, empresa]);
  console.log('products', products);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Container
      className="App"
      sx={{
        display: 'Flex',
        margin: '2 3 3 2',
        flexDirection: 'column',
        paddingLeft: '0px',
        alignItems: 'center',
      }}>
      <>
        <Container
          sx={{
            display: 'Flex',
            justifyContent: 'space-between',
            /* paddingLeft: '0px', */
          }}>
          {/* <Box
            component={'img'}
            src={
              empresa === 'tevelam'
                ? '/assets/tevelam_3.jpg'
                : '/assets/discopro.png'
            }
            sx={{ maxWidth: '550px', maxHeight: '150px' }}
          /> */}
          {
            <>
              <Box
                component={'div'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundImage: `url(/assets/tevelam_2.jpg)`,
                  /* backgroundSize: '100%', */
                  backgroundPositionY: 'center',
                  width: '100%',
                  position: 'relative',
                  paddingLeft: '!0px',
                  paddingRight: '0px',
                }}>
                <Typography
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                  }}
                  sx={
                    empresa === 'tevelam'
                      ? {
                          background: '#fc2d01',
                          color: 'white',
                          padding: '4px 7px 4px 7px',
                          borderRadius: '10px',
                        }
                      : {
                          background: '#4b4b4d',
                          color: 'white',
                          padding: '4px 7px 4px 7px',
                          borderRadius: '10px',
                        }
                  }>
                  {user &&
                    'Hoy es ' +
                      new Date(Date.now()).toLocaleDateString('es-AR')}
                </Typography>
              </Box>
              {user && (
                <Box
                  component={'div'}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%',
                    padding: '10px 0 20px 0',
                  }}>
                  <HeaderForm placeholder="Número cliente" type="text" />
                  <HeaderForm placeholder="Cliente" type="text" />
                  <HeaderForm placeholder="Condición %" type="number" />
                  <HeaderForm placeholder="Observación" type="text" />
                </Box>
              )}
            </>
          }

          {!user && <GoogleLoginComp />}
        </Container>

        <Paper
          elevation={'3'}
          style={{ scrollMargin: true, width: 'fit-content' }}>
          {user && (
            <>
              <Button onClick={toggleDrawer(true)}>Marcas</Button>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                {'DrawerList'}
              </Drawer>
              <ResetCartButton />
            </>
          )}
          {products && <TableComp products={products} />}
        </Paper>
      </>
    </Container>
  );
};

export default Main;
