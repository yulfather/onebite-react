import './App.css';

import { Routes, Route } from 'react-router-dom';
import { getEmotionImage } from './util/get-emotion-image';

import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Diary';
import Notfound from './pages/Notfound';

// 1. "/" : 인덱스 페이지로서 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

function App() {
  return (
    <>
      <div>
        <img src={getEmotionImage(1)} />
        <img src={getEmotionImage(2)} />
        <img src={getEmotionImage(3)} />
        <img src={getEmotionImage(4)} />
        <img src={getEmotionImage(5)} />
      </div>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/new'} element={<New />} />
        <Route path={'/diary/:id'} element={<Diary />} />
        <Route path={'/Edit/:id'} element={<Edit />} />
        <Route path={'*'} element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
