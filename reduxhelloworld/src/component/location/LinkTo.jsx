import React from 'react';
import { useNavigate } from 'react-router-dom';

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
      <button type='button' onClick={linkToMainFn}>
        목록으로 돌아가기
      </button>
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
      <button type='button' onClick={linkToRegistFn}>
        새로운 글 등록하기
      </button>
    </div>
  );
};
