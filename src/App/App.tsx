import Reac, {useEffect} from 'react';
import './App.css';
import { getPosts } from '../api/api';
import Posts from './Posts/Posts';

function App() {
  

  return (
    <Posts />
  );
}

export default App;
