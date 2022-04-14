import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo/todoReducer';

export default configureStore({
  reducer: {
    todo: todoReducer,
  },
});
