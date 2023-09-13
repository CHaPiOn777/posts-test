import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPost, TUser } from "../../../types/types"

type TPostState = {
  posts: TPost[];
  isLoading: boolean;
  error: string;
  favorites: number[];
  idChecked: number[];
}

const initialState: TPostState = {
  posts: [],
  isLoading: false,
  error: '',
  favorites: [],
  idChecked: [],
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
    toggleFavorites(state, action: PayloadAction<number>) {
      state.idChecked = [];
      if (state.favorites.some(item => item === action.payload)) {
        state.favorites = state.favorites.filter(item => item !== action.payload)
      } else {
        state.favorites.push(action.payload)
      }
    },
    addChecked(state, action: PayloadAction<number>) {
      if (state.idChecked.some(item => item === action.payload)) {
        state.idChecked = state.idChecked.filter(item => item !== action.payload)
      } else {
        state.idChecked.push(action.payload)
      }
    },
    postsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = true;
      state.error = action.payload;
    },
    
    postsDelete(state) {
      state.isLoading = false;
      state.error = '';
    },
    
    postsDeleteSuccess(state, action: PayloadAction<number>) {
      state.isLoading = false;
      state.posts = state.posts.filter(item => item.id !== action.payload);
      state.idChecked = [];
    },
    
    postsDeleteError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export default PostsSlice.reducer;