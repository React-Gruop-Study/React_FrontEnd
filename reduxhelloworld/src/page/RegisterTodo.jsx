import TodoSave from 'component/registertodo/TodoSave';
import { useDispatch } from 'react-redux';
import React, { useRef } from 'react';
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

const RegisterTodo = () => {
  const saveTextRef = useRef();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const firebaseDB = getFirestore(initialize);
  const storage = getStorage(initialize);

  // import한 firebase/firestore에서 db.collection은 되지않는다.
  // db.collection('Test')
  //   .add({
  //     text: 'Hello World',
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });

  // 실시간 데이터 가져오기
  onSnapshot(doc(firebaseDB, 'Test', '2'), (res) => {
    console.log(res.data());
  });
  let uploadFiles;
  let storageRef;
  const checkFile = (event) => {
    console.log(event.target.files);
    const file = Array.from(event.target.files);
    // ref 두번째 파라미터는 업로드한 파일명과 스토리지에 등록하는 파일명이 같아야한다. 임의로 수정하면 에러남.
    // const storageRef = ref(storage, '1'); -> 에러

    // eslint-disable-next-line array-callback-return
    console.log(Array.isArray(file), file);
    file.forEach((files, idx) => {
      console.log(files);
      console.log(idx);
      storageRef = ref(storage, files.name);
      uploadFiles = uploadBytes(storageRef, file[idx]);
      const uploadTask = uploadBytesResumable(storageRef, files);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              console.log('error');
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log('권한이 없습니다.');
              break;
            case 'storage/canceled':
              console.log('업로드가 취소되었습니다.');
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse 서버쪽 오류일수있다.
              console.log('알수없는 오류로 취소되었습니다.');
              break;
            default:
              console.log('실패했습니다.');
          }
        },
      );
    });

    // for문 안에두면 메세지가 파일갯수마다 나온다
    // let을 쓰지않고 for문안에 넣어도 한번만 나오게 가능한지?
    uploadFiles
      .then(() => {
        console.log('파일업로드 성공');
      })
      .catch((error) => console.log(error));
  };

  const saveTextFn = () => {
    const text = saveTextRef.current.value;
    dispatch(thunkSaveTodo({ text })).then(() => {
      navigator('/');
    });
  };

  // ref 두번째 파라미터는 업로드한 파일명과 스토리지에 등록하는 파일명이 같아야한다. 임의로 수정하면 에러남.
  // const storageRef = ref(storage, '1'); -> 에러
  // uuid, path, imgName 저장용
  const registText = () => {
    setDoc(doc(firebaseDB, 'Test', '2'), {
      text: 'HELLO WORLD',
    }).then(() => alert('저장완료'));
  };

  return (
    <div>
      <TodoSave ref={saveTextRef} onClick={saveTextFn} onChange={checkFile} />
      <LinkToMain />
    </div>
  );
};

export default RegisterTodo;
