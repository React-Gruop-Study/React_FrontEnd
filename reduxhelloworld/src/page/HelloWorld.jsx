import { Box } from '@mui/material';
import ImgListViewer from 'component/helloworld/ImgListViewer';
import ResViewer from 'component/helloworld/ResViewer';
import SnoInput from 'component/helloworld/SnoInput';
import { LinkToRegist } from 'component/location/LinkTo';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  thunkDeleteTodo,
  thunkGetHelloWorld,
  thunkGetList,
} from 'store/helloworld/helloworldSlice';

// page를 라우터로 분리하고, 컴포넌트안에서 페이지별 폴더구조를 나눈다.
const HelloWorld = () => {
  const snoRef = useRef();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const deleteSnoNum = useSelector((state) => state.todo.sno);

  /**
   * 수정시 변경된 sno값이 state에 유지되어 ResViewer에서 sno값만 바뀌고 text가 바뀌지 않는 현상이 나타남.
   * sno를 어딘가에 저장해놓고 불러서 렌더링하여 text도 바뀌게 하는 트리거가 필요.
   * onChange를 viewer sno에 걸었지만 변경되지 않은 값이라 onChange 불가능
   * state에 저장된 sno를 가져와서 useEffect로 렌더링 후 불러오기로 수정
   * 이방식으로 했을때의 단점
   * 1. 디폴트값이 0이어서 존재하지않는 sno라는 alert창이 계속뜸
   * 해결방안 - 디폴트값을 없애고 백엔드에서 desc로 최종값을 가져오게 만들기
   */
  const snoNum = useSelector((state) => state.todo.sno);

  // api작업으로 잠시 주석처리
  // useEffect(() => {
  //   dispatch(thunkGetHelloWorld(snoNum));
  // }, []);

  useEffect(() => {
    dispatch(thunkGetList(1));
  }, []);

  // 각 api호출마다 하나의 함수로 분리한다.
  const getSnoFn = async () => {
    // dispatch는 fufilled시 then이 가능하다.
    await dispatch(thunkGetHelloWorld(Number(snoRef.current.value))).then(
      () => {
        // navigator('/chicken');
      },
    );
    // catch는 rejected에서 관리한다.
  };

  const modifySnoFn = async () => {
    navigator('/modifytodo');
  };

  const deleteSnoFn = async (sno) => {
    await dispatch(thunkDeleteTodo(Number(sno))).then(() => {
      window.location.replace('/');
    });
  };

  // snoinput에서 클릭하여 조회하는 이벤트를 상위로올려서 함수를 파라미터로 전달한다.
  return (
    <Box>
      {/* 검색기능 api작업으로 비활성화<SnoInput ref={snoRef} onClick={getSnoFn} /> */}
      <ImgListViewer onClick={deleteSnoFn} />
      {/* <ResViewer />
      <div>
        <button type='button' onClick={modifySnoFn}>
          현재 글 수정하기
        </button>
      </div>
      <div>
        <button type='button' onClick={deleteSnoFn}>
          현재 글 삭제하기
        </button>
      </div> */}

      {/* <FirebaseTest /> */}
    </Box>
  );
};

export default HelloWorld;
