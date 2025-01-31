import React from 'react';
import { Drawer, Button, Typography, Container, Paper } from '@mui/material';

import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

const Main = () => {
  const [open, setOpen] = React.useState(false);
  const user = useAuth();
  console.log('user de Main.js', user);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const axiosInstance = useAxios();

  const getAllProductsHandle = () => {
    const entidad = 'products';
    axiosInstance(entidad);
  };

  return (
    <Container className="App" style={{ margin: '2 3 3 2' }}>
      <Paper elevation={'3'}>
        <Typography component={'h2'}>Get_Products</Typography>
        <Button onClick={toggleDrawer(true)}>Marcas</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {'DrawerList'}
        </Drawer>
        <form method="get" onSubmit={getAllProductsHandle}>
          <input type="submit" value={'Get Productos'} />
        </form>
      </Paper>
    </Container>
  );
};

export default Main;
