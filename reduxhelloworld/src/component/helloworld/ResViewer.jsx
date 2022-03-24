import React from 'react';
import { useSelector } from 'react-redux';

const ResViewer = () => {
  const sno = useSelector((state) => state.todo.sno);
  const text = useSelector((state) => state.todo.text);

  return (
    <div className='mainDiv'>
      <h1>{sno}</h1>
      <h1>{text}</h1>
    </div>
  );
};

export default ResViewer;
