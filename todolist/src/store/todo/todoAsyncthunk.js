import { getStorage, ref, uploadBytesResumable } from '@firebase/storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getHelloWorld,
  saveTodo,
  getList,
  modifyTodo,
  deleteTodo,
  getTextWithImg,
} from 'api/index';
import { initialize } from 'config/firebaseInit';
import { getFirestore } from 'firebase/firestore';

export const thunkGetList = createAsyncThunk(
  'getList',
  async (page, { rejectWithValue }) => {
    try {
      const res = await getList(page);
      return res;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const thunkGetTextWithImg = createAsyncThunk(
  'getTextWithImg',
  async (sno, { rejectWithValue }) => {
    try {
      const res = await getTextWithImg(sno);
      return res;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const thunkSaveTodo = createAsyncThunk(
  'saveTodo',
  async (saveData, { rejectWithValue }) => {
    try {
      const res = await saveTodo(saveData);
      // firestore저장용
      const firebaseDB = getFirestore(initialize);
      // firestorage 저장용
      const storage = getStorage(initialize);
      const fileList = Array.from(saveData.fileList);
      fileList.forEach((files, idx) => {
        try {
          const storageRef = ref(storage, res[idx].imgName);
          const uploadTask = uploadBytesResumable(storageRef, files);
          console.log(files);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`upload is ${progress}% done`);
              // eslint-disable-next-line no-unused-expressions
              progress === 100 && console.log('업로드 완료 되었습니다.');
            },
            (error) => {
              switch (error.code) {
                case 'storage/unauthorized':
                  return '권한이 없습니다.';
                case 'storage/canceled':
                  return '업로드가 취소되었습니다.';
                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse 서버쪽 오류일수있다.
                  return '서버 오류로 취소되었습니다.';
                default:
                  return '알수없는 오류로 취소되었습니다.';
              } // end switch
            }, // end error
          ); // end uploadTask.on
        } catch (error) {
          console.log(error);
        }
      }); // end forEach

      return res;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const thunkModifyTodo = createAsyncThunk(
  'modifyTodo',
  async (TestDTO, { rejectWithValue }) => {
    try {
      const res = await modifyTodo(TestDTO);
      return res;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const thunkDeleteTodo = createAsyncThunk(
  'deleteTodo',
  async (sno, { rejectWithValue }) => {
    try {
      const res = await deleteTodo(sno);
      return res;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);
