import React from 'react';
import { Drawer, Button, Typography, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

// import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import GoogleLoginComp from './GoogleLogin.jsx';

import TableComp from './Table.jsx';

const Main = () => {
  const user = useSelector((state) => state.user.payload);
  const empresa = useSelector((state) => state.empresa);

  const [open, setOpen] = React.useState(false);

  const [products, setProducts] = React.useState(null);

  const axiosInstance = useAxios(user || { clientId: null, credential: null });

  React.useEffect(() => {
    const entidad = `products/?empresa=${empresa}`;

    user &&
      axiosInstance.get(entidad).then((value) => {
        setProducts(value.data.data);
      });
  }, [user, axiosInstance, empresa]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Container className="App" style={{ margin: '2 3 3 2' }}>
      <GoogleLoginComp />
      <Paper elevation={'3'}>
        <Typography component={'h2'}>Get_Products</Typography>
        <Button onClick={toggleDrawer(true)}>Marcas</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {'DrawerList'}
        </Drawer>

        {products && <TableComp products={products} />}
      </Paper>
    </Container>
  );
};

export default Main;
