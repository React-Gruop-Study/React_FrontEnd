import React from 'react';
import { useSelector } from 'react-redux';

const ResViewer = () => {
  const sno = useSelector((state) => state.todo.sno);
  const text = useSelector((state) => state.todo.text);

  return (
    <div className='mainDiv'>
      <div>
        sno : <input type='text' value={sno} readOnly />
      </div>
      <div>
        text : <input type='text' value={text} readOnly />
      </div>
    </div>
  );
};

export default ResViewer;
