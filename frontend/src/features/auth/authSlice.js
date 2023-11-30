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
            localStorage.setItem('authtoken', action.payload['auth_token']);
        },
        logout: (state, action) => {
            state.isAuthenticated = false;
            localStorage.removeItem('authtoken');
        },
    },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;