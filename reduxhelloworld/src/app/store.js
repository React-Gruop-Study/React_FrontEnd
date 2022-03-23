import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './../api/index';
 
export default configureStore({
    reducer: {
        todo: todoSlice
    }
});