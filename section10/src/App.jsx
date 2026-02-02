import './App.css';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import {
  useReducer,
  useRef,
  useMemo,
  useCallback,
  createContext,
} from 'react';

const mockData = [
  {
    id: 0,
    isDone: false,
    content: 'React배우기',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: 'TypeScript 배우기',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: 'NextJs 학습하기',
    date: new Date().getTime(),
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) =>
        item.id === action.targetId
          ? { ...item, isDone: !item.isDone }
          : item,
      );
    case 'DELETE':
      return state.filter(
        (item) => item.id !== action.targetId,
      );
    default:
      state;
  }
};

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onDispatch = (action) => dispatch(action);

  // useCallback
  // -> 함수를 기억(memoization)해서, 불필요한 재생성을 막는 Hook
  // const memoizedFn = useCallback(fn, deps);
  // - fn: 기억하고 싶은 함수
  // - deps: 이 값들이 바뀔 때만 새로 만듬

  // const onCreate = (content) =>
  //   onDispatch({
  //     type: 'CREATE',
  //     data: {
  //       id: idRef.current++,
  //       isDone: false,
  //       content: content,
  //       date: new Date().getTime(),
  //     },
  //   });

  // const onUpdate = (targetId) =>
  //   onDispatch({ type: 'UPDATE', targetId });

  // const onDelete = (targetId) => {
  //   onDispatch({ type: 'DELETE', targetId });
  // };

  const onCreate = useCallback(
    (content) =>
      onDispatch({
        type: 'CREATE',
        data: {
          id: idRef.current++,
          isDone: false,
          content: content,
          date: new Date().getTime(),
        },
      }),
    [],
  );

  const onUpdate = useCallback((targetId) => {
    onDispatch({ type: 'UPDATE', targetId });
  }, []);

  const onDelete = useCallback((targetId) => {
    onDispatch({ type: 'DELETE', targetId });
  }, []);

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, [onCreate, onUpdate, onDelete]);

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider
          value={memoizedDispatch}
        >
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}
export default App;
