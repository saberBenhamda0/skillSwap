import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    access: "",
    refresh: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setJwtToken: (state, action) => {
            state.access = action.payload.access;
            if (action.payload.refresh) {
                state.refresh = action.payload.refresh;
            }
        }
    }
});


export const { regenerateJwtToken, setJwtToken } = authSlice.actions; 
export default authSlice.reducer;