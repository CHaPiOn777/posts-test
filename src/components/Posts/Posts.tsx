import { useEffect } from "react";
import styles from "./Posts.module.css";
import Post from "./Post/Post";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchComments, fetchUsers } from "../../store/reducers/ActionCreater";
import { Loader } from "../Loader/Loader";

const Posts = () => {
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.commentsReducer);
  const { posts, isLoading, error } = useAppSelector(
    (state) => state.postReducer
  );
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  const { users } = useAppSelector((state) => state.usersReducer);

  return (
    <Loader loader={isLoading}>
      {error && <h1 className={styles.error}>{error}</h1>}
      <div className={styles.posts}>
        {posts &&
          users &&
          posts.map((post, index) => {
            return (
              <Post
                key={index}
                body={post.body}
                id={post.id}
                title={post.title}
                user={users.filter((item) => item.id === post.userId)}
                comments={comments.filter((item) => item.postId === post.id)}
              />
            );
          })}
      </div>
    </Loader>
  );
};

export default Posts;
