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

// 리덕스로 비동기 요청을 위하여 Thunk라는 미들웨어를 설정했다.
// rejectWithValue는 예외사항이 발생하여 fulfilled(성공)로 가지않고 reject(실패)로 가기위해서
// async뒤 파라미터로 전달한다.
// thunk는 일종의 actionCreator이다
export const thunkGetHelloWorld = createAsyncThunk(
  'getHelloWorld',
  async (sno, { rejectWithValue }) => {
    try {
      const res = await getHelloWorld(sno);
      // rejectWithValue의 스트링값이 state.message로 전달된다.
      // 화살표함수가 있으면 브레이스({})로 감싸야한다. 감싸지않으면 기본으로 return이 된다.
      // 성공했지만 -1의 경우 rejectWithValue를 통해 에러메세지를 던진다.
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
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 400,
      };
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
              switch (snapshot.state) {
                case 'paused':
                  return '업로드 일시중지';
                case 'running':
                  return (
                    progress === 100 && console.log('업로드 완료 되었습니다.')
                  );
                default:
                  return '업로드 중 알 수 없는 에러가 발생하였습니다.';
              }
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
  // rejectWithValue가 두번째 파라미터에 있어야한다.
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

    // reject를 위해서 message처리를 했다.
    message: '',

    // 성공실패 이전에 pending구간에서 로딩이 필요한 경우에 선언한다.
    loading: false,

    imgDTOList: '',
    modifyList: '',
  },

  // 동기적으로 처리할경우 reducers
  // 비동기로 처리하지 않는경우.
  reducers: {
    changeText: (state, action) => {
      state.text = action.payload;
    },
    changeImgName: (state, action) => {
      state.imgDTOList = action.payload;
    },
    // scsMsg: (state, action) => {
    //   state.msg = action.payload;
    // },
  },

  // 비동기로 처리하는경우 extraReducers
  // 비동기는 setTimeOut, Promise
  // Promise는 pending(미결), fulfilled(성공), rejected(실패) 세가지가있다.
  // fulfilled와 rejected는 side Effect이다
  // side Effect처리를 어떻게하느냐에 따라 달라진다. 무조건 부정적인게 아니다.
  extraReducers: {
    /**
     * thunkGetHelloWorld
     */
    [thunkGetHelloWorld.pending]: (state, action) => {
      console.log('thunkGetHelloWorld.pending', action);
      state.loading = true;
    },
    [thunkGetHelloWorld.fulfilled]: (state, action) => {
      console.log('thunkGetHelloWorld.fulfilled', action);
      state.loading = false;
      state.sno = action.payload.sno;
      state.text = action.payload.text;
      // return action.payload

      // reducer에는 리턴을 하지않는다. void를 반환하도록 되어있으니 따르자. 리턴하면 아래 에러가 나온다.
      // Uncaught (in promise) Error: [Immer] An immer producer returned
      // a new value *and* modified its draft. Either return a new value
      // *or* modify the draft.
    },
    [thunkGetHelloWorld.rejected]: (state, action) => {
      console.log('thunkGetHelloWorld.rejected', action);

      // state.message는 initialState를 가르킨다. 자동으로 매핑된다.
      state.message = action.payload;
      state.loading = false;
      alert(state.message);
    },

    /**
     * thunkGetList
     */
    [thunkGetList.pending]: (state, action) => {
      console.log('thunkGetList.pending', action);
      state.loading = true;
    },
    [thunkGetList.fulfilled]: (state, action) => {
      console.log('thunkGetList.fulfilled', action);
      state.dtoList = action.payload.dtoList;
      state.loading = false;
    },
    [thunkGetList.rejected]: (state, action) => {
      console.log('thunkGetList.rejected', action);
      state.loading = false;
    },

    /**
     * thunkGetTextWithImg
     */
    [thunkGetTextWithImg.pending]: (state, action) => {
      console.log('thunkGetTextWithImg.pending', action);
      state.loading = true;
    },
    [thunkGetTextWithImg.fulfilled]: (state, action) => {
      console.log('thunkGetTextWithImg.fulfilled', action);
      state.modifyList = action.payload;
      state.loading = false;
    },
    [thunkGetTextWithImg.rejected]: (state, action) => {
      console.log('thunkGetTextWithImg.rejected', action);
      state.loading = false;
    },

    /**
     * thunkSaveTodo
     */
    [thunkSaveTodo.pending]: (state, action) => {
      console.log('thunkSaveTodo.pending', action);
      state.loading = true;
    },
    [thunkSaveTodo.fulfilled]: (state, action) => {
      console.log('thunkSaveTodo.fulfilled', action);
      state.loading = false;
      state.saveResImgList = action.payload;
    },
    [thunkSaveTodo.rejected]: (state, action) => {
      console.log('thunkSaveTodo.rejected', action);
      state.message = action.payload;
      state.loading = false;
      alert(state.message);
    },

    /**
     * thunkModifyTodo
     */
    [thunkModifyTodo.pending]: (state, action) => {
      console.log('thunkModifyTodo.pending', action);
      state.loading = true;
    },
    [thunkModifyTodo.fulfilled]: (state, action) => {
      console.log('thunkModifyTodo.fulfilled', action);
      state.message = action.payload;
      alert(state.message);
      state.loading = false;
    },
    [thunkModifyTodo.rejected]: (state, action) => {
      console.log('thunkModifyTodo.rejected', action);
      state.message = action.payload;
      state.loading = false;
      alert(state.message);
    },

    /**
     * thunkDeleteTodo
     */
    [thunkDeleteTodo.pending]: (state, action) => {
      console.log('thunkDeleteTodo.pending', action);
      state.loading = true;
    },
    [thunkDeleteTodo.fulfilled]: (state, action) => {
      console.log('thunkDeleteTodo.fulfilled', action);
      state.message = action.payload;
      alert(state.message);
      state.loading = false;
    },
    [thunkDeleteTodo.rejected]: (state, action) => {
      console.log('thunkDeleteTodo.rejected', action);
      state.message = action.payload;
      state.loading = false;
      alert(state.message);
    },
  },
});

export const { changeText, changeImgName } = todoSlice.actions;

export default todoSlice.reducer;
