import { Route, Routes, Link, useNavigate } from 'react-router-dom';

import Notfound from './pages/Notfound';
import Diary from './pages/Diary';
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';

import Button from './components/Button';

import './App.css';

import { getEmotionImage } from './util/get-emotion-image';

// 1. "/" : 모든 일기를 조회하는 Home 페이지

// 2. "/new" : 새로운 일기를 작성하는 New 페이지

// 3. "/diary" : 일기를 상세히 조화히는 Diary 페이지

// 4. "/edit" :  일기를 수정하는 Edit 페이지

// 5. "/notfound" : 잘못된페이지

// 주의사항
// 1. Routes 컴포넌트 안에는 일반적이 컴포넌트 올 수 없다.
//  -> Routes 컴포넌트 안에는 Route컴포넌트만 올수 있다
// 2. Routes 컴포넌트 밖에 입력된 컴포넌트는 모든 페이지에 공통적으로 표시된다.

// Link 컴포넌트 -> 클라이언트 사이드 렌더링 방식
// -> 새로고침 없이 빠르게 화면 전환
// -> html에 a테그를 데체하는 컴포넌트
// -> a테그 -> 서버사이드 렌더링 화면전환시 깜빡이며 비효율적

// 동적경로
// 1. URL Parameter
// -> /뒤에 아이템의 id를 명시 ~/product/1
// -> 아이템의 id 등의 변경되지 않는 값을 주소로 명시하기 위해 사용됨
// -> path props에 path="/diary/:id"

// 2. Query String
// -> ? 뒤에 변수명과 값 명시 ~/search?q=검색어
// -> 검색어 등의 자주 변경되는 값을 주소로 명시하기 위해 사용

function App() {
  const nav = useNavigate();

  const onClickButton = () => {
    nav('/new');
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
