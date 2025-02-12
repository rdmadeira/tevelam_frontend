import React from 'react';
import { Drawer, Button, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

// import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import GoogleLoginComp from './GoogleLogin.jsx';
import ResetCartButton from './ResetCartButton.jsx';
import ToogleEmpresaButton from './ToogleEmpresaButton.jsx';

import TableComp from './Table.jsx';

const Main = () => {
  const user = useSelector((state) => state.user);
  const empresa = useSelector((state) => state.empresa);

  const [open, setOpen] = React.useState(false);

  const [products, setProducts] = React.useState(null);

  const axiosInstance = useAxios(user || { clientId: null, credential: null });

  React.useEffect(() => {
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
    <Container className="App" style={{ margin: '2 3 3 2' }}>
      <GoogleLoginComp />
      <ToogleEmpresaButton empresa={empresa} />
      <Paper
        elevation={'3'}
        style={{ scrollMargin: true, width: 'fit-content' }}>
        <Button onClick={toggleDrawer(true)}>Marcas</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {'DrawerList'}
        </Drawer>
        <ResetCartButton />
        {products && <TableComp products={products} />}
      </Paper>
    </Container>
  );
};

export default Main;
