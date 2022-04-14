import { Box } from '@mui/material';
import ImgListViewer from 'component/helloworld/ImgListViewer';
import {
  LinkToImgConvert,
  LinkToImgSlice,
  LinkToModal,
  LinkToTextFieldTest,
} from 'common/location/LinkTo';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  thunkDeleteTodo,
  thunkGetHelloWorld,
  thunkGetList,
} from 'store/todo/todoAsyncthunk';
import { changeSno } from 'store/todo/todoReducer';

const HelloWorld = () => {
  const snoRef = useRef();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    dispatch(thunkGetList(1));
  }, []);

  const onClickLinkToModify = async (sno) => {
    dispatch(changeSno(sno));
    navigator('/modifytodo');
  };

  const scsMsg = useSelector((state) => state.todo.message);
  const errMsg = useSelector((state) => state.todo.errMsg);

  const onClickDeleteSno = async (sno) => {
    await dispatch(thunkDeleteTodo(Number(sno)))
      .then(() => {
        alert(scsMsg);
        navigator(0);
      })
      .catch(() => alert(errMsg));
  };
  return (
    <Box>
      <LinkToImgConvert />
      <LinkToImgSlice />
      <LinkToModal />
      <LinkToTextFieldTest />
      <ImgListViewer
        onClickLinkToModify={onClickLinkToModify}
        onClickDeleteSno={onClickDeleteSno}
      />
    </Box>
  );
};

export default HelloWorld;
