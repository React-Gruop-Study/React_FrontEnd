import React, { forwardRef } from 'react';

const TodoSave = forwardRef(({ onClick }, ref) => {
  return (
    <div>
      <input type='text' ref={ref} />
      <button type='button' onClick={onClick}>
        저장하기
      </button>
    </div>
  );
});

export default TodoSave;
