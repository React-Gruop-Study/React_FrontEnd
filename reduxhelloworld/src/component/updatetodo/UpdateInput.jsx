import { LinkToMain } from 'component/location/LinkTo';
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

const UpdateViewer = forwardRef(({ onClick }, ref) => {
  const sno = useSelector((state) => state.todo.sno);
  const text = useSelector((state) => state.todo.text);

  return (
    <div>
      <div>
        sno : <input type='text' value={sno} readOnly />
      </div>
      <div>
        변경할 값 : <input type='text' defaultValue={text} ref={ref} />
      </div>
      <button type='button' onClick={onClick}>
        수정완료
      </button>
      <LinkToMain />
    </div>
  );
});

export default UpdateViewer;
