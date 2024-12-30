import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
    name:'value',
    initialState:{
        token:''
    },
    reducers:{
        updateToken: (state,action)=>{
            sessionStorage.setItem("token", action.payload);
            state.token = action.payload;
        }
    }

});

export const {updateToken} = Slice.actions;