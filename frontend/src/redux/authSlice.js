import { createSlice } from "@reduxjs/toolkit";

const aauthSlice = createSlice({
    name: "auth",
    initialState:{
        loading: false
    },
    reducers:{
        // aaction
        setLoading:(state, action) => {
            state.loading = action.payload;
        }
    }
});
export const { setLoading} = aauthSlice.actions;
export default aauthSlice.reducer;
