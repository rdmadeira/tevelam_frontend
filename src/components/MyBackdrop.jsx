import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: '#fff',
  },
}));

const SpinnerBackdrop = ({ backdropOpen, ...args }) => {
  const classes = useStyles();

  return (
    <Backdrop open={backdropOpen} className={classes.backdrop}>
      <CircularProgress {...args} />
    </Backdrop>
  );
};

export default SpinnerBackdrop;
