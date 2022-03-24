import ResViewer from 'component/helloworld/ResViewer';
import SnoInput from 'component/helloworld/SnoInput';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkGetHelloWorld } from 'store/helloworld/helloworldSlice';

// page를 라우터로 분리하고, 컴포넌트안에서 페이지별 폴더구조를 나눈다.
const HelloWorld = () => {
  const snoRef = useRef();
  const dispatch = useDispatch();

  const navigator = useNavigate();

  // 각 api호출마다 하나의 함수로 분리한다.
  const saveSnoFn = () => {
    // dispatch는 fufilled시 then이 가능하다.
    dispatch(thunkGetHelloWorld(Number(snoRef.current.value))).then(() => {
      navigator('/chicken');
    });
    // catch는 rejected에서 관리한다.
  };

  // snoinput에서 클릭하여 조회하는 이벤트를 상위로올려서 함수를 파라미터로 전달한다.
  return (
    <div>
      <SnoInput ref={snoRef} onClick={saveSnoFn} />
      <ResViewer />
    </div>
  );
};

export default HelloWorld;
