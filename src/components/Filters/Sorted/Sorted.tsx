import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Sorted.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { PostsSlice } from "../../../store/reducers/PostsSlice";

const Sorted = () => {
  const dispatch = useAppDispatch();
  const { sortedPosts } = PostsSlice.actions;
  const [params, setParams] = useState<string>("ID Card");
  const [ascending, setAscending] = useState<string>("Ascending");

  useEffect(() => {
    dispatch(sortedPosts([params, ascending]));
  }, [params, ascending]);

  return (
    <div className={styles.sortedContainer}>
      <select
        className={styles.select}
        onChange={(e) => setParams(e.target.value)}
      >
        <option value="ID Card">ID Card</option>
        <option value="User Name">User Name</option>
        <option value="Favorites">Favorites</option>
      </select>
      <select
        className={styles.select}
        onChange={(e) => setAscending(e.target.value)}
      >
        <option value="По возрастанию">Ascending</option>
        <option value="По убыванию">Descending</option>
      </select>
    </div>
  );
};

export default Sorted;
