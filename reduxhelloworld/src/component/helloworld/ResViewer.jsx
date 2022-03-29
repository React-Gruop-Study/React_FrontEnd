import React from 'react';
import { useSelector } from 'react-redux';

const ResViewer = ({ onChange }) => {
  const sno = useSelector((state) => state.todo.sno);
  const text = useSelector((state) => state.todo.text);

  return (
    <div className='mainDiv'>
      <div>
        sno : <input type='text' value={sno} onChange={onChange} />
      </div>
      text : <input type='text' value={text} />
    </div>
  );
};

export default ResViewer;
