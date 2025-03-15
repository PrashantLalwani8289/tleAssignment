
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState, userData } from "../../interface/userInterface";

const firstState:initialState={
    isAuthenticated: false,
    user: null
}

const authSlice = createSlice({
    name: "root",
    initialState: firstState,
    reducers: {
        setUser: (state, action: PayloadAction<userData>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});
export const {setUser, removeUser} = authSlice.actions;

export default authSlice.reducer