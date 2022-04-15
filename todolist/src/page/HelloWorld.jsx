import { Box } from '@mui/material';
import ImgListViewer from 'component/helloworld/ImgListViewer';
import {
  LinkToImgConvert,
  LinkToImgSlice,
  LinkToModal,
  LinkToTextFieldTest,
} from 'common/location/LinkTo';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  thunkDeleteTodo,
  thunkGetHelloWorld,
  thunkGetList,
} from 'store/todo/todoAsyncthunk';
import { changeSno } from 'store/todo/todoReducer';
import Modal from 'common/modal/Modal';

const HelloWorld = () => {
  const snoRef = useRef();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    dispatch(thunkGetList(1));
  }, []);

  const [modalHeader, setModalHeader] = useState();
  const [modalContent, setModalContent] = useState();
  const [modalRedirect, setModalRedirect] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const onClickLinkToModify = async (sno) => {
    await dispatch(changeSno(sno));
    navigator('/modifytodo');
  };

  const scsMsg = useSelector((state) => state.todo.message);
  const errMsg = useSelector((state) => state.todo.errMsg);

  const onClickDeleteSno = async (sno) => {
    await dispatch(thunkDeleteTodo(Number(sno))).then((action) => {
      setModalOpen(true);
      setModalHeader('알림');
      setModalContent(action.payload);
      setModalRedirect('0');
    });
  };

  return (
    <Box>
      <LinkToImgConvert />
      <LinkToImgSlice />
      <LinkToTextFieldTest />
      <ImgListViewer
        onClickLinkToModify={onClickLinkToModify}
        onClickDeleteSno={onClickDeleteSno}
      />
      <Modal
        header={modalHeader}
        content={modalContent}
        modalState={modalOpen}
        returnLink={modalRedirect}
        onClickModalClose={handleModalClose}
      />
    </Box>
  );
};

export default HelloWorld;
