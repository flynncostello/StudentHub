// loadingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        privateChatroomLoading: false,
        groupChatroomLoading: false,
        signUpLoading: false,
        loginLoading: false,
    },
    reducers: {
        setPrivateChatroomLoading: (state, action) => {
            state.privateChatroomLoading = action.payload;
        },
        setGroupChatroomLoading: (state, action) => {
            state.groupChatroomLoading = action.payload;
        },
    },
});

export const { setPrivateChatroomLoading, setGroupChatroomLoading } = loadingSlice.actions;
export const selectLoadings = (state) => state.loadings;
export default loadingSlice.reducer;