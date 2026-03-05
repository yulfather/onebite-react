import './App.css';
import { useRef, useReducer, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { mockData } from './util/stateData';
import { reducer, useActionDispatch } from './hooks/useCreateDispatch';
import {
  TodosStateContext,
  TodosDispatchContext,
} from './contexts/TodoContext';
import Todo from './pages/Todo';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import Notfound from './pages/Notfound';

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(
    (mockData.reduce((max, t) => Math.max(max, t.id), 0) || 0) + 1,
  );
  const nav = useNavigate();

  const location = useLocation();
  const isTodoPage = location.pathname === '/todo';
  const targetPath = isTodoPage ? '/' : '/todo';
  const buttonText = isTodoPage ? 'Home페이지 이동' : 'Todo페이지 이동';

  const onCreateTodo = useActionDispatch({
    type: 'CREATE',
    dispatch,
    buildAction: (content) => ({
      data: {
        id: idRef.current++,
        isDone: false,
        content,
        emotionId: 1,
        date: new Date().getTime(),
      },
    }),
  });

  const onCreateDiary = useActionDispatch({
    type: 'CREATE',
    dispatch,
    buildAction: (date, emotionId, content) => ({
      data: {
        id: idRef.current++,
        isDone: false,
        content,
        emotionId,
        date,
      },
    }),
  });

  const onUpdateTodo = useActionDispatch({
    type: 'UPDATETODO',
    dispatch,
    buildAction: (targetId) => ({ targetId }),
  });

  const onUpdateDiary = useActionDispatch({
    type: 'UPDATEDIARY',
    dispatch,
    buildAction: (id, content, emotionId, date) => ({
      data: {
        id,
        isDone: false,
        content,
        emotionId,
        date,
      },
    }),
  });

  const onDelete = useActionDispatch({
    type: 'DELETE',
    dispatch,
    buildAction: (targetId) => ({ targetId }),
  });

  return (
    <div className={'App'}>
      <TodosStateContext.Provider value={data}>
        <TodosDispatchContext.Provider
          value={{
            onCreateTodo,
            onCreateDiary,
            onUpdateTodo,
            onUpdateDiary,
            onDelete,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </TodosDispatchContext.Provider>
      </TodosStateContext.Provider>
    </div>
  );
}

export default App;
