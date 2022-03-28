import RegisterTodo from 'page/RegisterTodo';
import UpdateTodo from 'page/UpdateTodo';
import HelloWorld from 'page/HelloWorld';
import React, { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HelloWorld />} />
        <Route path='registertodo' element={<RegisterTodo />} />
        <Route path='modifytodo' element={<UpdateTodo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
