import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  thunkModifyTodo,
  thunkGetTextWithImg,
} from 'store/todo/todoAsyncthunk';
import { useNavigate } from 'react-router-dom';
import UpdateViewer from 'component/updatetodo/UpdateInput';

const UpdateTodo = () => {
  const sno = useSelector((state) => state.todo.sno);
  const scsMsg = useSelector((state) => state.todo.message);
  const errMsg = useSelector((state) => state.todo.errMsg);
  const changedText = useRef();
  const navigator = useNavigate();

  const dispatch = useDispatch();
  useEffect(async () => {
    // await dispatch(thunkGetTextWithImg(sno));
  }, []);

  const modifyTodoFn = () => {
    const text = changedText.current.value;
    dispatch(thunkModifyTodo({ sno, text }))
      .then(() => {
        alert(scsMsg);
        navigator('/');
      })
      .catch(() => alert(errMsg));
  };

  return (
    <div>
      <UpdateViewer ref={changedText} onClick={modifyTodoFn} />
    </div>
  );
};

export default UpdateTodo;
