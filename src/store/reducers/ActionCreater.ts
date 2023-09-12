import axios from "axios";
import { AppDispatch } from "../store";
import { TComments, TPost, TUser } from "../../../types/types";
import { baseURL } from "../../api/api";
import { PostsSlice } from "./PostsSlice";
import { UsersSlice } from "./UsersSlice";
import { CommentsSlice } from "./CommentsSlice";

export const fetchPosts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(PostsSlice.actions.postsFetching());
    const res = await axios.get<TPost[]>(`${baseURL}posts`);
    dispatch(PostsSlice.actions.postsFetchingSuccess(res.data));
  } catch (e) {
    dispatch(PostsSlice.actions.postsFetchingError('Произошла ошибка при загрузке постов'));
  }
}

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(UsersSlice.actions.usersFetching());
    const res = await axios.get<TUser[]>(`${baseURL}users`);
    dispatch(UsersSlice.actions.usersFetchingSuccess(res.data));
  } catch (e) {
    dispatch(UsersSlice.actions.usersFetchingError('Произошла ошибка при загрузке пользователей'));
  }
}

export const fetchComments = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(CommentsSlice.actions.commentsFetching());
    const res = await axios.get<TComments[]>(`${baseURL}comments`);
    dispatch(CommentsSlice.actions.commentsFetchingSuccess(res.data));
  } catch (e) {
    dispatch(CommentsSlice.actions.commentsFetchingError('Произошла ошибка при загрузке пользователей'));
  }
}