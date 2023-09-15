import React, { useEffect, useState } from "react";
import styles from './DisplayItems.module.css';
import { useAppDispatch } from "../../../hooks/redux";
import { PostsSlice } from "../../../store/reducers/PostsSlice";

const DisplayItems = () => {
  const dispatch = useAppDispatch();
  const { setpostsPage } = PostsSlice.actions;
  const [counterPerPages, setCounterPerPages] = useState<string>('10');

  useEffect(() => {
    dispatch(setpostsPage(counterPerPages))
  }, [counterPerPages])


  return (
    <div className={styles.selectContainer}>
      <p>Display items</p>
      <select
        className={styles.select}
        onChange={(e) => setCounterPerPages(e.target.value)}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="All">All</option>
      </select>
    </div>
  );
};

export default DisplayItems;
