import React, { forwardRef } from 'react';

// forwardRef는 상위컴포넌트에서 ref를 파라미터로 보낼때 사용한다.(많은경우에 사용하진않는다.)
// React.forwardRef((props, ref) --> 리액트 공식문서 파라미터순서를 지켜야한다.
const TestInput = forwardRef(({ onClick }, ref) => {
  return (
    <div>
      <h3>
        sno를 입력해주세요 : &nbsp;
        <input type='text' ref={ref} />
        <button type='button' onClick={onClick}>
          불러오기
        </button>
      </h3>
    </div>
  );
});

export default TestInput;
