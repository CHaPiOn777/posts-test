import { SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Posts.module.css";
import Post from "./Post/Post";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchComments, fetchUsers } from "../../store/reducers/ActionCreater";
import { Loader } from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";

const Posts = () => {
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.commentsReducer);
  const { user } = useAppSelector((state) => state.usersReducer);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { postsPage } = useAppSelector((state) => state.postReducer);

  const { favorites, isFavorites, paramSort } = useAppSelector(
    (state) => state.postReducer
  );
  const { posts, isLoading, error } = useAppSelector(
    (state) => state.postReducer
  );

  // const [allPosts, setAllPosts] = useState<any[]>(posts);

  const postsFilter = useMemo(() => {
    if (isFavorites === true) {
      const a = favorites.map((favorite) => {
        return posts.filter((post) => post.post.id === favorite);
      });
      return a.flat();
    }
    if (user === "All") return posts;
    return posts.filter((post) => post.user[0].name === user);
  }, [user, posts, favorites, isFavorites, paramSort]);

  const postsPageNew = useMemo(() => {
    return postsPage === "All" ? postsFilter.length : postsPage;
  }, [postsPage]);

  const lastPostPages = currentPage * Number(postsPageNew);
  const firstPostPages = lastPostPages - Number(postsPageNew);
  const currentPost = postsFilter.slice(firstPostPages, lastPostPages);

  const paginate = (currentPage: SetStateAction<number>) => setCurrentPage(currentPage)

  // let copy = [...allPosts];

  // const sortedPosts = useCallback(() => {
  //   const [w, e] = paramSort;

  //   // debugger
  //   // postsFilter.sort()
  //   console.log(w === "User Name")
  //   if (w === "User Name") {
  //     if (e === "Ascending") {
  //       copy.sort((a, b) => {
  //         if (a.user[0].name > b.user[0].name) {
  //           return 1;
  //         }
  //         if (a.user[0].name < b.user[0].name) {
  //           return -1;
  //         }
  //         return 0;
  //         // return 0;
  //       });

  //     } else {

  //       copy.sort((a, b) => {
  //         if (a.user[0].name < b.user[0].name) {
  //           return 1;
  //         }
  //         if (a.user[0].name > b.user[0].name) {
  //           return -1;
  //         }
  //         return 0;
  //       });
  //     }
  //   }
  //   return setAllPosts(copy);

  // }, [copy])
  // useEffect(() => {
  //   sortedPosts()
  // }, [paramSort, sortedPosts]);

  // useEffect(() => {
  //   setPostsqwe(copy);
  // }, [copy]);

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
          users &&
          currentPost.map(({ post, user }, index) => {
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
      <Pagination totalPosts={posts.length} paginate={paginate} />
    </Loader>
  );
};

export default Posts;
