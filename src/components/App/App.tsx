import Reac, { useEffect } from "react";
import "./App.css";
import { getPosts } from "../../api/api";
import Posts from "../Posts/Posts";
import { useAppDispatch } from "../../hooks/redux";
import { fetchPosts, fetchUsers } from "../../store/reducers/ActionCreater";
import Filters from "../Filters/Filters";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <Filters></Filters>
      <Posts />
    </>
  );
}

export default App;
