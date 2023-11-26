import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('authtoken');

let initialState = {}

if(token) {
    initialState.isAuthenticated = true;
} else {
    initialState.isAuthenticated = false;
}

const authSlice = createSlice({
    name: 'auth', 
    initialState, 
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            localStorage.setItem('authtoken', action.payload['token']);
        },
        logout: (state, action) => {
            localStorage.removeItem('authtoken');
        },
    },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;