import './App.css';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Notfound from './pages/Notfound';

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

// Route에 속성으로 지정된 path경로에 따라 element에 입력된 컴포넌트를 렌더링함
// Routes 컴포넌트안에는 Route컴포넌트만 올 수 있음
// 페이지 이동 방법 react-router-dom 에서 불러와
// - <Link></Link> html에 a테그와 같은기능으로 링크속성에 경로로 이동
// - useNavigate()훅이용 이벤트헨들러 함수를 사용하여 특정 조건에 맞게 페이지 이동

// 동적라우팅
// Route 속성 path 경로에 url파라미터를 사용할 것임을 명시해야됨
//  -> path="/diary/:id"
function App() {
  const nav = useNavigate();

  const onClickButton = () => {
    nav('/new');
  };
  return (
    <>
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/new'}>New</Link>
        <Link to={'/diary'}>Diary</Link>
      </div>
      <button onClick={onClickButton}>new이동</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
