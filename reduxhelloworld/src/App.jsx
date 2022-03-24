import React, { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HelloWorld from './page/HelloWorld';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HelloWorld />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
