import React, { useEffect, useState } from "react";
import styles from "./Posts.module.css";
import { getPosts } from "../../api/api";
import Post from "./Post/Post";
import { TPost } from "../../../types/types";

const Posts = () => {
  const [posts, setPosts] = useState<TPost[]>();

  useEffect(() => {
    getPosts().then((res) => setPosts(res));
  }, []);

  return (
    <div className={styles.posts}>
      {posts &&
        posts.map((post, index) => {
          return (
            <Post
              key={index}
              body={post.body}
              id={post.id}
              title={post.title}
              userId={post.userId}
            />
          );
        })}
    </div>
  );
};

export default Posts;
