import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkModifyTodo } from 'store/helloworld/helloworldSlice';
import { useNavigate } from 'react-router-dom';
import UpdateViewer from 'component/updatetodo/UpdateInput';

const UpdateTodo = () => {
  const sno = useSelector((state) => state.todo.sno);
  const dispatch = useDispatch();
  const changedText = useRef();
  const navigator = useNavigate();

  const modifyTodoFn = () => {
    const text = changedText.current.value;
    dispatch(thunkModifyTodo({ sno, text })).then(() => {
      navigator('/');
    });
  };

  return (
    <div>
      <UpdateViewer ref={changedText} onClick={modifyTodoFn} />
    </div>
  );
};

export default UpdateTodo;
