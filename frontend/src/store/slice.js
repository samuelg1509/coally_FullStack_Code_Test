import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
    name:'value',
    initialState:{
        token:''
    },
    reducers:{
        setToken: (state,action)=>{
            state.token = action.payload;
        }
    }

});

export const {setToken} = Slice.actions;