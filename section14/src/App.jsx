import './App.css';

import { Routes, Route } from 'react-router-dom';
import { useReducer, useRef } from 'react';
import {
  DiaryStateContext,
  DiaryDispatchContext,
} from './context/DiaryContext';

import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';

// 1. "/" : 인덱스 페이지로서 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

const mockData = [
  {
    id: 1,
    createdDate: new Date('2026-02-12').getTime(),
    emotionId: 1,
    content: '1번 일기입니다.',
  },
  {
    id: 2,
    createdDate: new Date('2026-02-09').getTime(),
    emotionId: 2,
    content: '2번 일기입니다.',
  },
  {
    id: 3,
    createdDate: new Date('2026-01-22').getTime(),
    emotionId: 3,
    content: '3번 일기입니다.',
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
  // 새로운 일기를 추가하는 기능
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

  // 기존일기수정
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

  // 기존일기삭제
  const onDelete = (id) => {
    dispatch({ type: 'DELETE', id });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/new'} element={<New />} />
            <Route path={'/diary/:id'} element={<Diary />} />
            <Route path={'/Edit/:id'} element={<Edit />} />
            <Route path={'*'} element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
