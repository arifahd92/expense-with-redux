import { createSlice } from "@reduxjs/toolkit";


const initialAuthState={
    isAthenticated:!!localStorage.getItem('email'),
};

const authSlice=createSlice({
   name:'Authentication',
    initialState:initialAuthState,
    reducers:{
        login(state){
            state.isAthenticated=true;
        },
        logout(state){
            localStorage.removeItem('idToken');
            localStorage.removeItem('email');
            state.isAthenticated=false;
        }
    }
});

export const authAction=authSlice.actions;

export default authSlice.reducer
