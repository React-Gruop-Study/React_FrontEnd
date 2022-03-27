import TodoSave from 'component/RegisterTodo/TodoSave';
import { useDispatch } from 'react-redux';
import React, { useRef } from 'react';
import { thunkSaveTodo } from 'store/helloworld/helloworldSlice';
import { useNavigate } from 'react-router-dom';

const RegisterTodo = () => {
  const saveTextRef = useRef();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const saveTextFn = () => {
    const obj = {};
    obj.text = saveTextRef.current.value;
    dispatch(thunkSaveTodo(JSON.stringify(obj))).then(() => {
      navigator('/');
    });
  };

  const linkToMain = () => {
    navigator('/');
  };

  return (
    <div>
      <TodoSave ref={saveTextRef} onClick={saveTextFn} />
      <button type='button' onClick={linkToMain}>
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default RegisterTodo;
