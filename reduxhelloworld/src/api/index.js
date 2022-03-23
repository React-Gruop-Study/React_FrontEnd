import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getHelloWorld = createAsyncThunk('getHelloWorld', async(sno) => {
    try{
        const res = await axios.get('http://localhost:8080/helloworld/'+sno)
        return res.data
    }catch(e){
        alert(e)
    }finally{
        console.log('Finally 서비스로직을 구현하는부분')
    }
})

const todoSlice = createSlice({ 
    name: "sno",
    initialState: {
        sno: 1,
        text: 'aa',
    },
    reducers: {
        changeText: (state, action) => {
            state.text = action.payload
        }
    },
    extraReducers: {
        [getHelloWorld.fulfilled]: (state, action) => {
            console.log('getHelloWorld.fulfilled', action)
            return action.payload
        }
    }
})

export const {changeText} = todoSlice.actions

export default todoSlice.reducer