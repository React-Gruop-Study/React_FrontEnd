import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  thunkModifyTodo,
  thunkGetTextWithImg,
} from 'store/todo/todoAsyncthunk';
import { useNavigate } from 'react-router-dom';
import UpdateViewer from 'component/updatetodo/UpdateInput';
import Modal from 'common/modal/Modal';

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

  const [modalHeader, setModalHeader] = useState();
  const [modalContent, setModalContent] = useState();
  const [modalRedirect, setModalRedirect] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const modifyTodoFn = () => {
    const text = changedText.current.value;
    dispatch(thunkModifyTodo({ sno, text }))
      .then((action) => {
        setModalOpen(true);
        setModalHeader('알림');
        setModalContent(action.payload);
        setModalRedirect('/');
      })
      .catch(() => alert(errMsg));
  };

  return (
    <div>
      <UpdateViewer ref={changedText} onClick={modifyTodoFn} />
      <Modal
        header={modalHeader}
        content={modalContent}
        modalState={modalOpen}
        returnLink={modalRedirect}
        onClickModalClose={handleModalClose}
      />
    </div>
  );
};

export default UpdateTodo;
