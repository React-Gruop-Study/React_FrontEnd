import { LinkToMain } from 'component/location/LinkTo';
import React, { forwardRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetTextWithImg } from 'store/helloworld/helloworldSlice';

const UpdateViewer = forwardRef(({ onClick }, ref) => {
  const sno = useSelector((state) => state.todo.sno);
  const text = useSelector((state) => state.todo.text);
  const modifyList = useSelector((state) => state.todo);

  const [sno1, setSno1] = useState();
  const [text1, setText1] = useState();
  const [src, setSrc] = useState();

  const dispatch = useDispatch();

  const getTextWithImg = () => {
    const snoNum = sno;
    dispatch(thunkGetTextWithImg(snoNum)).then((res) => {
      setSno1(res.payload[0][0].sno);
      setText1(res.payload[0][0].text);
      setSrc(res.payload[0][1].path);
    });
  };

  useEffect(() => {
    getTextWithImg();
  }, []);
  return (
    <div>
      <div>
        sno : <input type='text' value={sno1 || ''} readOnly />
      </div>
      <div>
        변경할 값 : <input type='text' defaultValue={text1} ref={ref} />
      </div>
      <button type='button' onClick={onClick}>
        수정완료
      </button>
      <img src={src} width='350' />
      <LinkToMain />
    </div>
  );
});

export default UpdateViewer;
