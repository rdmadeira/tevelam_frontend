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
import FilterContainer from './FilterContainer.jsx';

const Main = () => {
  const user = useSelector((state) => state.user);

  const [open, setOpen] = React.useState(false);

  const [products, setProducts] = React.useState(null);

  const [empresa, setEmpresa] = React.useState('tevelam');

  const axiosInstance = useAxios(user || { clientId: null, credential: null });

  React.useEffect(() => {
    const queryObj = queryString.parse(window.location.search);

    const entidad = `products/?empresa=${queryObj.focus}&iscurrent=true`;

    user &&
      axiosInstance.get(entidad).then((value) => {
        setEmpresa(queryObj?.focus || 'tevelam');

        setProducts(value.data.data);
      });
  }, [empresa, setEmpresa, user, axiosInstance]);

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
      }}>
      <>
        <Container
          sx={{
            display: 'Flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
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
                      ? `url(/assets/tevelam_3.jpg)`
                      : `url(/assets/discopro.png)`,
                  /* backgroundSize: '100%', */
                  backgroundPositionY: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#4b4b4d',
                  width: '300px',
                  height: '200px',

                  paddingLeft: '0px',
                  paddingRight: '0px',
                }}></Box>
              {user && (
                <Typography
                  style={{
                    height: '30px',
                    alignSelf: 'flex-end',
                  }}
                  sx={
                    empresa === 'tevelam'
                      ? {
                          padding: '4px 7px 4px 7px',
                        }
                      : {
                          padding: '4px 7px 4px 7px',
                        }
                  }>
                  {'Hoy es ' + new Date(Date.now()).toLocaleDateString('es-AR')}
                </Typography>
              )}
              {user && <HeaderForm />}
            </>
          }

          {!user && (
            <Box sx={{ marginTop: '20px' }}>
              <GoogleLoginComp />
            </Box>
          )}
        </Container>

        <Paper elevation={'3'} style={{ scrollMargin: true, width: '100%' }}>
          {user && (
            <>
              <Button onClick={toggleDrawer(true)}>Marcas</Button>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                {'DrawerList'}
              </Drawer>
              <ResetCartButton />
              {products && (
                <FilterContainer
                  products={products}
                  /* filterValues={filterValues}
                  setFilterValues={setFilterValues} */
                />
              )}
            </>
          )}
          {products && (
            <TableComp
              products={products}
              /* filterValues={filterValues}
              setFilterValues={setFilterValues} */
            />
          )}
        </Paper>
      </>
    </Container>
  );
};

export default Main;
