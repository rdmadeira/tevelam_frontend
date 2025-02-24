import React from 'react';
import { Container, Paper, Box } from '@mui/material';

import { useSelector } from 'react-redux';
import queryString from 'query-string';

import useAxios from '../hooks/useAxios';

import ResetCartButton from './ResetCartButton.jsx';
import Header from './Header.jsx';

import TableComp from './Table.jsx';
import FilterContainer from './FilterContainer.jsx';

import Image from './CustomImage.jsx';
import logoMarcas from '../data/logomarcas.json';

const Main = () => {
  const user = useSelector((state) => state.user);

  const [products, setProducts] = React.useState(null);

  const [empresa, setEmpresa] = React.useState('tevelam');

  const axiosInstance = useAxios(user || { clientId: null, credential: null });

  React.useEffect(() => {
    const queryObj = queryString.parse(window.location.search);

    const entidad = `products/?empresa=${queryObj.focus}&iscurrent=true`;

    setEmpresa(queryObj?.focus || 'tevelam');

    user &&
      axiosInstance.get(entidad).then((value) => {
        setProducts(value.data.data);
      });
  }, [empresa, setEmpresa, user, axiosInstance]);

  return (
    <Box
      className="App"
      sx={{
        display: 'Flex',
        /* margin: '2 3 3 2', */
        flexDirection: 'column',
      }}>
      <>
        <Header empresa={empresa} user={user} />
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
