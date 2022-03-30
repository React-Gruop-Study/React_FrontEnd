import TodoSave from 'component/registertodo/TodoSave';
import { useDispatch } from 'react-redux';
import React, { useRef } from 'react';
import { thunkSaveTodo } from 'store/helloworld/helloworldSlice';
import { useNavigate } from 'react-router-dom';
import { LinkToMain } from 'component/location/LinkTo';

const RegisterTodo = () => {
  const saveTextRef = useRef();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const saveTextFn = () => {
    const text = saveTextRef.current.value;
    dispatch(thunkSaveTodo({ text })).then(() => {
      navigator('/');
    });
  };

  return (
    <div>
      <TodoSave ref={saveTextRef} onClick={saveTextFn} />
      <LinkToMain />
    </div>
  );
};

export default RegisterTodo;
