import RegisterTodo from 'page/RegisterTodo';
import UpdateTodo from 'page/UpdateTodo';
import HelloWorld from 'page/HelloWorld';
import React, { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, Container, ListSubheader } from '@mui/material';
import BNB from 'common/BNB';
import TNB from 'common/TNB';
import 'App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Box>
        <Box>
          <TNB />
        </Box>
        <Box className='Content'>
          <Routes>
            <Route path='/' element={<HelloWorld />} />
            <Route path='registertodo' element={<RegisterTodo />} />
            <Route path='modifytodo' element={<UpdateTodo />} />
          </Routes>
        </Box>
        <Box className='BNB'>
          <BNB />
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
