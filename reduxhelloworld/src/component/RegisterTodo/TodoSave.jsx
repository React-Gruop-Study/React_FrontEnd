import React, { forwardRef } from 'react';

const TodoSave = forwardRef(({ onClick, onChange }, refFn) => {
  return (
    <div>
      <input type='text' ref={refFn} />
      <div>
        <input type='file' onChange={onChange} multiple />
      </div>
      <button type='button' onClick={onClick}>
        저장하기
      </button>
    </div>
  );
});

export default TodoSave;
