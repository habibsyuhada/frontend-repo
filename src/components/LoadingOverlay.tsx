import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';
import { useSelector } from 'react-redux';

const LoadingOverlay = () => {
  const { loading } = useSelector((state: any) => state.user);
  return (
    <Backdrop
      style={{ color: '#fff', zIndex: 1300 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
