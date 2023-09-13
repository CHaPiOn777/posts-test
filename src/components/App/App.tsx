import Reac, {useEffect} from 'react';
import './App.css';
import { getPosts } from '../../api/api';
import Posts from '../Posts/Posts';
import { useAppDispatch } from '../../hooks/redux';
import { fetchPosts, fetchUsers } from '../../store/reducers/ActionCreater';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  

  return (
    <Posts />
  );
}

export default App;
