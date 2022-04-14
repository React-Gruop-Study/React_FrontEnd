import { createSlice } from '@reduxjs/toolkit';
import {
  thunkGetList,
  thunkGetTextWithImg,
  thunkSaveTodo,
  thunkModifyTodo,
  thunkDeleteTodo,
} from './todoAsyncthunk';

const todoSlice = createSlice({
  name: 'sno',
  initialState: {
    sno: 0,
    text: '',
    imgSrc: '',
    saveResImgList: [],
    message: '',
    loading: false,
    imgDTOList: '',
    errMsg: '',
  },

  // 동기적으로 처리할경우 reducers
  // 비동기로 처리하지 않는경우.
  reducers: {
    changeSno: (state, action) => {
      state.sno = action.payload;
    },
    changeImgName: (state, action) => {
      state.imgDTOList = action.payload;
    },
  },

  extraReducers: {
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
      console.log(`rejected`);
      state.loading = false;
    },

    /**
     * thunkGetTextWithImg
     */
    [thunkGetTextWithImg.pending]: (state, action) => {
      state.loading = true;
    },
    [thunkGetTextWithImg.fulfilled]: (state, action) => {
      state.sno = action.payload[0][0].sno;
      state.text = action.payload[0][0].text;
      state.imgSrc = action.payload[0][1].path;
      console.log(`1 : ${state.sno}, ${state.text}, ${state.imgSrc}`);
      state.loading = false;
    },
    [thunkGetTextWithImg.rejected]: (state, action) => {
      console.log(`rejected`);
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
      console.log(`rejected`);
      state.errMsg = action.payload;
      state.loading = false;
    },

    /**
     * thunkModifyTodo
     */
    [thunkModifyTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [thunkModifyTodo.fulfilled]: (state, action) => {
      state.message = action.payload;
      state.loading = false;
    },
    [thunkModifyTodo.rejected]: (state, action) => {
      console.log(`rejected`);
      state.errMsg = action.payload;
      state.loading = false;
    },

    /**
     * thunkDeleteTodo
     */
    [thunkDeleteTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [thunkDeleteTodo.fulfilled]: (state, action) => {
      state.message = action.payload;
      console.log(state.message);
      state.loading = false;
    },
    [thunkDeleteTodo.rejected]: (state, action) => {
      console.log(`rejected`);
      state.errMsg = action.payload;
      state.loading = false;
    },
  },
});

export const { changeSno, changeImgName, changeModalState } = todoSlice.actions;

export default todoSlice.reducer;
