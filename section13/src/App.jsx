import './App.css';
import { useReducer, useRef } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';

import {
  DiaryStateContext,
  DiaryDispatchContext,
} from './context/DiaryContext';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
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

const mockData = [
  {
    id: 1,
    createdDate: new Date('2026-02-07').getTime(),
    emotionId: 1,
    content: '1번 일기 내용',
  },
  {
    id: 2,
    createdDate: new Date('2026-02-06').getTime(),
    emotionId: 2,
    content: '2번 일기 내용',
  },
  {
    id: 3,
    createdDate: new Date('2026-01-06').getTime(),
    emotionId: 3,
    content: '3번 일기 내용',
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item,
      );
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
};

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(4);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({ type: 'DELETE', id });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
