import RegisterTodo from 'page/RegisterTodo';
import UpdateTodo from 'page/UpdateTodo';
import HelloWorld from 'page/HelloWorld';
import React, { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, Container, ListSubheader } from '@mui/material';
import BNB from 'common/BNB';
import GNB from 'common/GNB';
import 'App.css';
import ImgTest from './test/ImgTest';
import ReactSlick from './test/ReactSlick';

const App = () => {
  return (
    <BrowserRouter>
      <Box className='MainContent'>
        <Box>
          <GNB />
        </Box>
        <Box
          className='Content'
          // sx={{
          //   height: 'calc(100vh - 110px)',
          //   overflow: 'auto',
          //   overflowY: 'scroll',
          // }}
        >
          <Routes>
            <Route path='/' element={<HelloWorld />} />
            <Route path='registertodo' element={<RegisterTodo />} />
            <Route path='modifytodo' element={<UpdateTodo />} />
            <Route path='imgtest' element={<ImgTest />} />
            <Route path='slicktest' element={<ReactSlick />} />
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
