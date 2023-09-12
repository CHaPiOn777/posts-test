import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPost, TUser } from "../../../types/types"

type TUsersState = {
  users: TUser[];
  isLoading: boolean;
  error: string
}

const initialState: TUsersState = {
  users: [],
  isLoading: false,
  error: '' 
}

export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true;
    },
    usersFetchingSuccess(state, action: PayloadAction<TUser[]>) {
      state.isLoading = false;
      state.users = action.payload;
      state.error = '';
    },
    usersFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export default UsersSlice.reducer;