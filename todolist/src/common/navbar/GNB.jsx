import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { LinkToRegist, LinkToMain } from 'common/location/LinkTo';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const GNB = () => {
  const navigator = useNavigate();

  const linkToMainFn = () => {
    navigator('/');
  };
  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            onClick={linkToMainFn}
          >
            <Button color='inherit'>Journey</Button>
          </Typography>
          <LinkToRegist />
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default GNB;
