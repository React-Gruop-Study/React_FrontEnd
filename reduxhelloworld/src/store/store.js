import { configureStore } from '@reduxjs/toolkit';
import todoReducer from 'store/helloworld/helloworldSlice';

export default configureStore({
  reducer: {
    todo: todoReducer,
  },
});
