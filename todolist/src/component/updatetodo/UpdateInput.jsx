import { LinkToMain } from 'common/location/LinkTo';
import React, { forwardRef, useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { thunkGetTextWithImg } from 'store/todo/todoAsyncthunk';

const UpdateViewer = forwardRef(({ onClick }, ref) => {
  const { sno, text, src } = useSelector(
    (state) => ({
      sno: state.todo.sno,
      text: state.todo.text,
      src: state.todo.imgSrc,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetTextWithImg(sno));
  }, [text]);

  return (
    <div>
      <div>
        sno : <input type='text' value={sno || ''} readOnly />
      </div>
      <div>
        변경할 값 : <input type='text' defaultValue={text} ref={ref} />
      </div>
      <button type='button' onClick={onClick}>
        수정완료
      </button>
      <img src={src} width='375' alt='' />
      <LinkToMain />
    </div>
  );
});

export default UpdateViewer;
