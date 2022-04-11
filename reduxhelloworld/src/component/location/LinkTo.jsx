import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';

/**
 * 메인으로 가는 함수
 */
export const LinkToMain = () => {
  const navigator = useNavigate();

  const linkToMainFn = () => {
    navigator('/');
  };

  return (
    <div>
      <Typography onClick={linkToMainFn}>목록으로돌아가기</Typography>
    </div>
  );
};

/**
 * 글쓰기로 가는 함수
 */
export const LinkToRegist = () => {
  const navigator = useNavigate();

  const linkToRegistFn = () => {
    navigator('/registertodo');
  };

  return (
    <div>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ mr: 2 }}
        onClick={linkToRegistFn}
      >
        <AddBoxIcon />
      </IconButton>
    </div>
  );
};
