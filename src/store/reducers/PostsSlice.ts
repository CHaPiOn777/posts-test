import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPost, TUser } from "../../../types/types"

type TPostState = {
  posts: TPost[];
  isLoading: boolean;
  error: string
}

const initialState: TPostState = {
  posts: [],
  isLoading: false,
  error: '' 
}

export const PostsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postsFetching(state) {
      state.isLoading = true;
    },
    postsFetchingSuccess(state, action: PayloadAction<TPost[]>) {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = '';
    },

    postsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export default PostsSlice.reducer;