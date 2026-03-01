import './App.css';
import { useRef, useReducer, useCallback } from 'react';
import {
  todosStateContext,
  todosDispatchContext,
} from './contexts/TodoContext';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';

const mockData = [
  {
    id: 0,
    isDone: false,
    content: 'React Study',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: 'TypeScript Study',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: 'Life Study',
    date: new Date().getTime(),
  },
  {
    id: 3,
    isDone: false,
    content: '요리 배우기',
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item,
      );
    case 'DELETE':
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(
    (mockData.reduce((max, t) => Math.max(max, t.id), 0) || 0) + 1,
  );

  const onCreate = useCallback((content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: 'UPDATE',
      targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: 'DELETE',
      targetId,
    });
  }, []);

  // const onCreate = (content) => {
  //   dispatch({
  //     type: 'CREATE',
  //     data: {
  //       id: idRef.current++,
  //       isDone: false,
  //       content: content,
  //       date: new Date().getTime(),
  //     },
  //   });
  // };

  // const onUpdate = (targetId) => {
  //   dispatch({
  //     type: 'UPDATE',
  //     targetId,
  //   });
  // };

  // const onDelete = (targetId) => {
  //   dispatch({
  //     type: 'DELETE',
  //     targetId,
  //   });
  // };

  // const [todos, setTodos] = useState(mockData);

  // const onCreate = (content) => {
  //   const newTodo = {
  //     id: idRef.current++,
  //     isDone: false,
  //     content: content,
  //     date: new Date().getTime(),
  //   };

  //   setTodos([newTodo, ...todos]);
  // };

  // const onUpdate = (targetId) => {
  //   setTodos((prev) =>
  //     prev.map((item) =>
  //       item.id === targetId ? { ...item, isDone: !item.isDone } : item,
  //     ),
  //   );
  // };

  // const onDelete = (targetId) => {
  //   setTodos((prev) => prev.filter((item) => item.id !== targetId));
  // };

  return (
    <div className={'App'}>
      <todosStateContext.Provider value={todos}>
        <todosDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Header />
          <Editor />
          <List />
        </todosDispatchContext.Provider>
      </todosStateContext.Provider>
    </div>
  );
}

export default App;
