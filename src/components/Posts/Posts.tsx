import React, { useEffect, useState } from "react";
import styles from "./Posts.module.css";
import { getPosts } from "../../api/api";
import Post from "./Post/Post";
import { TPost } from "../../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPosts, fetchUsers } from "../../store/reducers/ActionCreater";
import { Loader } from "../Loader/Loader";

const Posts = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const { posts, isLoading, error } = useAppSelector(
    (state) => state.postReducer
  );
  const { users } = useAppSelector((state) => state.usersReducer);
  
  return (
    <Loader loader={isLoading}>
      {error && <h1 className={styles.error}>{error}</h1>}
      <div className={styles.posts}>
        {posts && users &&
          posts.map((post, index) => {
            return (
              <Post
                key={index}
                body={post.body}
                id={post.id}
                title={post.title}
                user={users.filter((item) => item.id === post.userId)}
              />
            );
          })}
      </div>
    </Loader>
  );
};

export default Posts;
