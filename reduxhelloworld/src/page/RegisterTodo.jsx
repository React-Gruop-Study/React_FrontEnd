import TodoSave from 'component/registertodo/TodoSave';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useState, useEffect } from 'react';
import { thunkSaveTodo } from 'store/helloworld/helloworldSlice';
import { useNavigate } from 'react-router-dom';
import { LinkToMain } from 'component/location/LinkTo';
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from '@firebase/storage';
import { initialize } from 'config/firebaseInit';
import { doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import ImgPreview from 'component/registertodo/ImgPreview';

const RegisterTodo = () => {
  const saveTextRef = useRef();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [fileList, setFileList] = useState([]);
  const firebaseDB = getFirestore(initialize);

  // import한 firebase/firestore에서 db.collection은 되지않는다.
  // db.collection('Test')
  //   .add({
  //     text: 'Hello World',
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });

  // 실시간 데이터 가져오기
  // onSnapshot(doc(firebaseDB, 'Test', '2'), (res) => {
  //   console.log(res.data());
  // });

  const checkFile = (event) => {
    console.log(event.target.files);
    const file = Array.from(event.target.files);
    setFileList(file);
    // console.log(Array.isArray(file), file);
  }; // end checkFile

  /* setState 비동기처리는 무조건 useEffect */
  /* useEffect(() => {
    console.log(fileList);
  }, [fileList]); */

  const imgObj = useSelector((state) => state.todo.imgDTOList);
  const imgObjArr = Array.from(imgObj);
  const imgDTOList = [];
  imgObjArr.forEach((res) => {
    imgDTOList.push({ imgName: res });
  });

  const saveTextFn = async () => {
    const text = saveTextRef.current.value;
    // {
    //   "text": "123",
    //   "imgDTOList": { "imgName": ["테크스택-001 (1).png"] }
    // } 아래로직은 이 형태로 나온다
    // const imgDTOList = {};
    // imgDTOList.imgName = imgList;'
    try {
      await dispatch(thunkSaveTodo({ text, imgDTOList, fileList })).then(
        (res) => {
          console.log(res);
          // navigator('/');
        },
      );
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  // uuid, path, imgName 저장용
  const registText = () => {
    setDoc(doc(firebaseDB, 'Test', '2'), {
      text: 'HELLO WORLD',
    }).then(() => alert('저장완료'));
  };

  return (
    <div>
      <TodoSave ref={saveTextRef} onClick={saveTextFn} />
      <ImgPreview onChange={checkFile} />
      {/* <LinkToMain /> */}
    </div>
  );
};

export default RegisterTodo;
