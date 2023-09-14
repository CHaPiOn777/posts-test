import { useEffect, useMemo } from "react";
import styles from "./Posts.module.css";
import Post from "./Post/Post";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchComments, fetchUsers } from "../../store/reducers/ActionCreater";
import { Loader } from "../Loader/Loader";

const Posts = () => {
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.commentsReducer);
  const { user } = useAppSelector((state) => state.usersReducer);
  const { favorites, isFavorites, paramSort } = useAppSelector(
    (state) => state.postReducer
  );
  const { posts, isLoading, error } = useAppSelector(
    (state) => state.postReducer
  );

  const postsFilter: any[] = useMemo(() => {
    if (isFavorites === true) {
      const a = favorites.map((favorite) => {
        return posts.filter((post) => post.post.id === favorite);
      });
      return a.flat()
    }
    if (user === "All") return posts;
    return posts.filter((post) => post.user[0].name === user);
  }, [user, posts, favorites, isFavorites]);

  useEffect(() => {
    const [w, e] = paramSort
    // postsFilter.sort()
    if (w === 'User Name') {
      postsFilter.sort((a, b) => {
        if (a.user.name > b.user.name) {
          return 1;
        }
        if (a.user.name < b.user.name) {
          return -1;
        }
        return 0;
      }) 
    }

    
  }, [paramSort])

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchComments());
  }, []);

  const { users } = useAppSelector((state) => state.usersReducer);

  return (
    <Loader loader={isLoading}>
      {error && <h1 className={styles.error}>{error}</h1>}
      <div className={styles.posts}>
        {posts &&
          users && postsFilter &&
          postsFilter?.map(({ post, user }, index) => {
            return (
              <Post
                key={index}
                body={post.body}
                id={post.id}
                title={post.title}
                user={user}
                comments={comments.filter((item) => item.postId === post.id)}
              />
            );
          })}
      </div>
    </Loader>
  );
};

export default Posts;
