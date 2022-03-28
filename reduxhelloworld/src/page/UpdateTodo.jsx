import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkToMain } from 'component/common/LinkTo';
import { thunkModifyTodo } from 'store/helloworld/helloworldSlice';
import { useNavigate } from 'react-router-dom';

const UpdateTodo = () => {
  const sno = useSelector((state) => state.todo.sno);
  const text = useSelector((state) => state.todo.text);
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
      <div>
        sno : <input type='text' value={sno} readOnly />
      </div>
      <div>
        변경할 값 : <input type='text' defaultValue={text} ref={changedText} />
      </div>
      <div>
        <button type='button' onClick={modifyTodoFn}>
          수정완료
        </button>
        <LinkToMain />
      </div>
    </div>
  );
};

export default UpdateTodo;
