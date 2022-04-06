import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { LinkToRegist } from 'component/location/LinkTo';

const TNB = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Journey
          </Typography>
          <LinkToRegist />
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TNB;
