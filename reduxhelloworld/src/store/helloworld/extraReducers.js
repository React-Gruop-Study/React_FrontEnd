import { thunkGetHelloWorld, thunkSaveTodo } from './helloworldSlice';

// 비동기로 처리하는경우 extraReducers
// 비동기는 setTimeOut, Promise
// Promise는 pending(미결), fulfilled(성공), rejected(실패) 세가지가있다.
// fulfilled와 rejected는 side Effect이다
// side Effect처리를 어떻게하느냐에 따라 달라진다. 무조건 부정적인게 아니다.

export const extraReducers = {
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
    alert(action.payload);
    state.loading = false;
  },
  [thunkSaveTodo.rejected]: (state, action) => {
    console.log('thunkSaveTodo.rejected', action);
    state.message = action.payload;
    state.loading = false;
    alert(state.message);
  },
};

export default extraReducers;
