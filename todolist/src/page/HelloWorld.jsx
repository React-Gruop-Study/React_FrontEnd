import { Box, Button } from '@mui/material';
import ImgListViewer from 'component/helloworld/ImgListViewer';
import { LinkToImgConvert, LinkToImgSlice } from 'component/location/LinkTo';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  changeSno,
  thunkDeleteTodo,
  thunkGetHelloWorld,
  thunkGetList,
} from 'store/helloworld/helloworldSlice';

const HelloWorld = () => {
  const snoRef = useRef();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    dispatch(thunkGetList(1));
  }, []);

  const getSnoFn = async () => {
    await dispatch(thunkGetHelloWorld(Number(snoRef.current.value)));
  };

  const onClickLinkToModify = async (sno) => {
    dispatch(changeSno(sno));
    navigator('/modifytodo');
  };
  const onClickDeleteSno = async (sno) => {
    await dispatch(thunkDeleteTodo(Number(sno))).then(() => {
      window.location.replace('/');
    });
  };
  return (
    <Box>
      <LinkToImgConvert />
      <LinkToImgSlice />
      <ImgListViewer
        onClickLinkToModify={onClickLinkToModify}
        onClickDeleteSno={onClickDeleteSno}
      />
    </Box>
  );
};

export default HelloWorld;
