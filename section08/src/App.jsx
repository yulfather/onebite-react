import './App.css';
import {
  useMemo,
  useRef,
  useReducer,
  useCallback,
  createContext,
} from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import Exam from './components/Exam';

const mockData = [
  {
    id: 0,
    isDone: false,
    content: 'React공부하기',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: 'Nextjs공부하기',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: 'Node공부하기',
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

// createContext() Component외부에 생성
// -> 데이터를 하위 component에게 전달만 하면됨
// App Coponent가 리렌더링 될때만 다시 생성될 필요 없음
// createContext내부에 provider 프로퍼티를 활용해 컴포넌트를 만들 수 있음
// -> provider의 본질은 component임 -> props전달 받는 component를 감싸서 사용
// <TodoContext.provider><Editor onCreate={onCreate} /></TodoContext.provider>

// 변하는값
export const TodoStateContext = createContext();
// 변하지 않는값
export const TodoDispatchContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onDispatchTodos = (action) => dispatch(action);

  // const onCreate = (content) => {
  //   onDispatchTodos({
  //     type: 'CREATE',
  //     data: {
  //       id: idRef.current++,
  //       idDone: false,
  //       content: content,
  //       date: new Date().getTime(),
  //     },
  //   });
  // };

  // const onUpdate = (targetId) => {
  //   onDispatchTodos({ type: 'UPDATE', targetId });
  // };

  // const onDelete = (targetId) => {
  //   onDispatchTodos({ type: 'DELETE', targetId });
  // };
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
  //     targetId: targetId,
  //   });
  // };

  // const onDelete = (targetId) => {
  //   dispatch({
  //     type: 'DELETE',
  //     targetId: targetId,
  //   });
  // };

  // useCallback(최적화 하고 싶은 함수, 의존성 배열)
  const onCreate = useCallback((content) => {
    onDispatchTodos({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        idDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    onDispatchTodos({ type: 'UPDATE', targetId });
  }, []);

  const onDelete = useCallback((targetId) => {
    onDispatchTodos({ type: 'DELETE', targetId });
  }, []);

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      <Exam />
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
