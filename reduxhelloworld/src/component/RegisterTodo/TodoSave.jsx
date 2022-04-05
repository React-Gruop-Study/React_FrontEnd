import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

const TodoSave = forwardRef(({ onClick }, refFn) => {
  return (
    <div>
      <input type='text' ref={refFn} />
      <button type='button' onClick={onClick}>
        저장하기
      </button>
    </div>
  );
});

export default TodoSave;
