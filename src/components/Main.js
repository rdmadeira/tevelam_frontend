import React from 'react';
import { Drawer, Button, Typography, Container, Paper } from '@mui/material';

const Main = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <Container className="App" style={{ margin: '2 3 3 2' }}>
      <Paper elevation={'3'}>
        <Typography component={'h2'}>Get_Products</Typography>
        <Button onClick={toggleDrawer(true)}>Marcas</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {'DrawerList'}
        </Drawer>
        <form
          method="get"
          action={
            'https://us-central1-tevelam-5c6b4.cloudfunctions.net/tevelamFunctions/api/v1/products'
          }>
          <input type="submit" value={'Get Productos'} />
        </form>
      </Paper>
    </Container>
  );
};

export default Main;
