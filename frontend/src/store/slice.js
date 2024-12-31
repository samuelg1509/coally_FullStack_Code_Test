import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
    name:'value',
    initialState:{
        token:''
    },
    reducers:{
        updateToken: (state,action)=>{
            state.token = action.payload;
        }
    }

});

export const {updateToken} = Slice.actions;