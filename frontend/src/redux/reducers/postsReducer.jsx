import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

const initialState = {
    posts: []
  };

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        updatePosts: (state, action) => {
            state.posts = action.payload;
        }
    }
});


export const {updatePosts} = postSlice.actions;
export default postSlice.reducer