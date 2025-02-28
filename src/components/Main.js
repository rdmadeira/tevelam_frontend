import React from 'react';
import { Container, Paper, Box } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';

import useAxios from '../hooks/useAxios';

import Header from './Header.jsx';
import TableComp from './Table.jsx';
import FilterContainer from './FilterContainer.jsx';
import Image from './CustomImage.jsx';
import logoMarcas from '../data/logomarcas.json';
import OrderModal from '../components/OrderModal.jsx';

import * as userActions from '../redux/user/userActions.js';

const Main = () => {
  const user = useSelector((state) => state.user);

  const [products, setProducts] = React.useState(null);

  const [empresa, setEmpresa] = React.useState('tevelam');

  const dispatch = useDispatch();

  const axiosInstance = useAxios(user || { clientId: null, credential: null });
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  React.useEffect(() => {
    const queryObj = queryString.parse(window.location.search);

    const entidad = `products/?empresa=${queryObj.focus || 'tevelam'}&iscurrent=true`;

    setEmpresa(queryObj?.focus || 'tevelam');

    user &&
      axiosInstance
        .get(entidad)
        .then((value) => {
          setProducts(value.data.data);
        })
        .catch((error) => {
          console.log('error.response', error.response);
          if (error.response.status === 401) {
            dispatch(userActions.signOutAction());
          }
        });
  }, [empresa, setEmpresa, user, axiosInstance, dispatch]);

  return (
    <Box
      className="App"
      sx={{
        display: 'Flex',
        /* margin: '2 3 3 2', */
        flexDirection: 'column',
      }}>
      <>
        <OrderModal
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          open={open}
          scroll={scroll}
          descriptionElementRef={descriptionElementRef}
        />
        <Header
          empresa={empresa}
          user={user}
          handleClickOpen={handleClickOpen}
        />
        <Container>
          <Paper
            elevation={'3'}
            style={{ scrollMargin: true, width: '100%', marginTop: '50px' }}>
            {!user && (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px 20px',
                }}>
                {logoMarcas[empresa].map((url) => (
                  <Image
                    key={url}
                    src={url}
                    style={{
                      width: empresa === 'tevelam' ? '15%' : '12%',
                      padding: empresa === 'tevelam' ? 'inherit' : '12px',
                    }}
                  />
                ))}
              </Box>
            )}
            {user && products && (
              <FilterContainer
                products={products}
                /* filterValues={filterValues}
                  setFilterValues={setFilterValues} */
              />
            )}
            {user && products && (
              <TableComp
                products={products}
                /* filterValues={filterValues}
              setFilterValues={setFilterValues} */
              />
            )}
          </Paper>
        </Container>
      </>
    </Box>
  );
};

export default Main;
