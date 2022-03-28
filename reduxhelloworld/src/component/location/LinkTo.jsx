import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LinkToMain = () => {
  const navigator = useNavigate();

  const linkToMainFn = () => {
    navigator('/');
  };

  return (
    <div>
      <button type='button' onClick={linkToMainFn}>
        목록으로 돌아가기
      </button>
    </div>
  );
};
