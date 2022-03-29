import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkToMain } from 'component/location/LinkTo';
import { thunkModifyTodo } from 'store/helloworld/helloworldSlice';
import { useNavigate } from 'react-router-dom';
import UpdateViewer from 'component/updatetodo/UpdateInput';

const UpdateTodo = () => {
  const sno = useSelector((state) => state.todo.sno);
  const dispatch = useDispatch();
  const changedText = useRef();
  const navigator = useNavigate();

  const modifyTodoFn = () => {
    const obj = {};
    obj.sno = sno.toString();
    obj.text = changedText.current.value;
    dispatch(thunkModifyTodo(obj)).then(() => {
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
