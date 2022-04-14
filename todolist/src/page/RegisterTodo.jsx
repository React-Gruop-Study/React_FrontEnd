import TodoSave from 'component/registertodo/TodoSave';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useState } from 'react';
import { thunkSaveTodo } from 'store/todo/todoAsyncthunk';
import { useNavigate } from 'react-router-dom';
import { initialize } from 'config/firebaseInit';
import { doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import ImgPreview from 'component/registertodo/ImgPreview';

const RegisterTodo = () => {
  const saveTextRef = useRef();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [fileList, setFileList] = useState([]);
  const firebaseDB = getFirestore(initialize);

  const checkFile = (event) => {
    console.log(event.target.files);
    const file = Array.from(event.target.files);
    setFileList(file);
  }; // end checkFile

  const imgObj = useSelector((state) => state.todo.imgDTOList);
  const imgObjArr = Array.from(imgObj);
  const imgDTOList = [];
  imgObjArr.forEach((res) => {
    imgDTOList.push({ imgName: res });
  });

  const errMsg = useSelector((state) => state.todo.errMsg);
  const saveTextFn = async () => {
    const text = saveTextRef.current.value;
    try {
      await dispatch(thunkSaveTodo({ text, imgDTOList, fileList })).then(() => {
        alert(errMsg);
      });
    } catch (rejectedValueOrSerializedError) {
      alert(rejectedValueOrSerializedError);
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
    </div>
  );
};

export default RegisterTodo;
