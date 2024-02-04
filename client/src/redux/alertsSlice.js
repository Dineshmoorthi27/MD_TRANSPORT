import { createSlice } from "@reduxjs/toolkit";

const alertsSlice = createSlice({
    name: 'alerts',
    initialState: {
        loading: false,
    },
    reducers: {
        showloading: (state, action) => {
            state.loading = true;
        },
        hideloading: (state, action) => {
            state.loading = false;
        },
    },
});

export const { showloading, hideloading } = alertsSlice.actions;
export default alertsSlice.reducer;