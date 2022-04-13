import { getStorage, ref, uploadBytesResumable } from '@firebase/storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const thunkGetHelloWorld = createAsyncThunk(
  'getHelloWorld',
  async (sno, { rejectWithValue }) => {
    try {
      const res = await getHelloWorld(sno);
      if (res.sno === -1) return rejectWithValue('존재하지않는 sno입니다.');
      return res;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

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

const todoSlice = createSlice({
  name: 'sno',
  initialState: {
    sno: 0,
    text: 'HELLO WORLD.',
    saveResImgList: [],
    message: '',
    loading: false,
    imgDTOList: '',
    modifyList: '',
  },

  // 동기적으로 처리할경우 reducers
  // 비동기로 처리하지 않는경우.
  reducers: {
    changeSno: (state, action) => {
      state.sno = action.payload;
    },
    changeText: (state, action) => {
      state.text = action.payload;
    },
    changeImgName: (state, action) => {
      state.imgDTOList = action.payload;
    },
  },

  extraReducers: {
    /**
     * thunkGetHelloWorld
     */
    [thunkGetHelloWorld.pending]: (state, action) => {
      state.loading = true;
    },
    [thunkGetHelloWorld.fulfilled]: (state, action) => {
      state.loading = false;
      state.sno = action.payload.sno;
      state.text = action.payload.text;
    },
    [thunkGetHelloWorld.rejected]: (state, action) => {
      state.message = action.payload;
      state.loading = false;
      alert(state.message);
    },

    /**
     * thunkGetList
     */
    [thunkGetList.pending]: (state, action) => {
      state.loading = true;
    },
    [thunkGetList.fulfilled]: (state, action) => {
      state.dtoList = action.payload.dtoList;
      state.loading = false;
    },
    [thunkGetList.rejected]: (state, action) => {
      state.loading = false;
    },

    /**
     * thunkGetTextWithImg
     */
    [thunkGetTextWithImg.pending]: (state, action) => {
      state.loading = true;
    },
    [thunkGetTextWithImg.fulfilled]: (state, action) => {
      state.modifyList = action.payload;
      state.loading = false;
    },
    [thunkGetTextWithImg.rejected]: (state, action) => {
      state.loading = false;
    },

    /**
     * thunkSaveTodo
     */
    [thunkSaveTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [thunkSaveTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.saveResImgList = action.payload;
    },
    [thunkSaveTodo.rejected]: (state, action) => {
      state.message = action.payload;
      state.loading = false;
      alert(state.message);
    },

    /**
     * thunkModifyTodo
     */
    [thunkModifyTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [thunkModifyTodo.fulfilled]: (state, action) => {
      state.message = action.payload;
      alert(state.message);
      state.loading = false;
    },
    [thunkModifyTodo.rejected]: (state, action) => {
      state.message = action.payload;
      state.loading = false;
      alert(state.message);
    },

    /**
     * thunkDeleteTodo
     */
    [thunkDeleteTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [thunkDeleteTodo.fulfilled]: (state, action) => {
      state.message = action.payload;
      alert(state.message);
      state.loading = false;
    },
    [thunkDeleteTodo.rejected]: (state, action) => {
      state.message = action.payload;
      state.loading = false;
      alert(state.message);
    },
  },
});

export const { changeSno, changeText, changeImgName } = todoSlice.actions;

export default todoSlice.reducer;
