// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
 name: 'user',
 initialState: {
    id: null,
    username: null,
    is_active: false,
    public_key: null,
    role: null,
    is_muted: false,
 },
 reducers: {
    setUser: (state, action) => {
        const { id, username, is_active, public_key, role, is_muted } = action.payload;
        state.id = id;
        state.username = username;
        state.is_active = is_active;
        state.public_key = public_key;
        state.role = role;
        state.is_muted = is_muted;
    },
    updateUser: (state, action) => {
        const { id, username, is_active, public_key, role, is_muted = false } = action.payload;
        state.id = id;
        state.username = username;
        state.is_active = is_active;
        state.public_key = public_key;
        state.role = role;
        state.is_muted = is_muted;
    },
    clearUserSlice: (state) => {
        state.id = null;
        state.username = null;
        state.is_active = false;
        state.public_key = null;
        state.role = null;
        state.is_muted = null;
    },
    setUserMutedState: (state, action) => {
        state.is_muted = action.payload;
    },
 },
});

export const { setUser, updateUser, clearUserSlice, setUserMutedState } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;