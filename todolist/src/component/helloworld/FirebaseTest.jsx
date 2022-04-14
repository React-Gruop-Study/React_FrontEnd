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

  const registText = () => {
    setDoc(doc(firebaseDB, 'Test', '2'), {
      text: 'HELLO WORLD',
    }).then(() => alert('저장완료'));
  };

  const checkFile = (event) => {
    const file = Array.from(event.target.files);
    file.forEach((files, idx) => {
      const storageRef = ref(storage, files.name);
      const uploadFiles = uploadBytes(storageRef, file[idx]);
      const uploadTask = uploadBytesResumable(storageRef, files);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);
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
              console.log('알수없는 오류로 취소되었습니다.');
              break;
            default:
              console.log('실패했습니다.');
          }
        },
      );
    });
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
        width='550'
        alt=''
      />
    </div>
  );
};

export default FirebaseTest;
