import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteTodo, getHelloWorld, modifyTodo, saveTodo } from 'api/index';

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

export const thunkSaveTodo = createAsyncThunk(
  'saveTodo',
  async (TestDTO, { rejectWithValue }) => {
    try {
      const res = await saveTodo(TestDTO);
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

    // reject를 위해서 message처리를 했다.
    message: '',

    // 성공실패 이전에 pending구간에서 로딩이 필요한 경우에 선언한다.
    loading: false,

    imgDTOList: '',
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
     * thunkSaveTodo
     */
    [thunkSaveTodo.pending]: (state, action) => {
      console.log('thunkSaveTodo.pending', action);
      state.loading = true;
    },
    [thunkSaveTodo.fulfilled]: (state, action) => {
      console.log('thunkSaveTodo.fulfilled', action);
      alert(`sno ${action.payload} 번으로 등록 되었습니다.`);
      state.loading = false;
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
