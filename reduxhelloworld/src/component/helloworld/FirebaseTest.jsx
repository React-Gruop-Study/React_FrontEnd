import React, { useEffect } from 'react';
import { initialize } from 'config/firebaseInit';
import { doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import {
  getMetadata,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from '@firebase/storage';

const FirebaseTest = () => {
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

  const registText = () => {
    setDoc(doc(firebaseDB, 'Test', '2'), {
      text: 'HELLO WORLD',
    }).then(() => alert('저장완료'));
  };

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

    uploadFiles
      .then(() => {
        console.log('파일업로드 성공');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h4>FirebaseTest</h4>
      <div>
        <button type='button' onClick={registText}>
          텍스트 파이어베이스에 저장하기
        </button>
      </div>
      <input type='file' onChange={checkFile} multiple />
      <img
        src='https://firebasestorage.googleapis.com/v0/b/journey-study.appspot.com/o/테크스택_및_협업툴.png?alt=media'
        width='350'
        height='350'
      />
    </div>
  );
};

export default FirebaseTest;
