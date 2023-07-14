import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSideNavOpen: false,
};

export const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        toggleSideNav: (state, action) => {
            state.isSideNavOpen = !state.isSideNavOpen;
        },
    },
});

const { actions, reducer } = layoutSlice;
export const { toggleSideNav } = actions;
export default reducer;