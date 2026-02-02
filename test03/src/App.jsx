import './App.css';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import Exam from './components/Exam';
import {
  useCallback,
  useRef,
  useReducer,
  useMemo,
} from 'react';
import {
  TodosStateContext,
  TodosDispatchContext,
} from './context/TodoContext';

const mockData = [
  {
    id: 0,
    isDone: false,
    content: 'React 공부하기',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: 'NextJS 공부하기',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: 'NodeJs 공부하기',
    date: new Date().getTime(),
  },
];

const reducer = (state, action) => {
  // console.log(action);
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
      return state;
  }
};

function App() {
  // const [todos, setTodos] = useState(mockData);
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onDispatch = (action) => dispatch(action);

  const onCreate = useCallback((content) => {
    onDispatch({
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
    onDispatch({ type: 'UPDATE', targetId });
  }, []);

  const onDelete = useCallback((targetId) => {
    onDispatch({ type: 'DELETE', targetId });
  }, []);

  // const onCreate = (content) => {
  //   onDispatch({
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
  //   onDispatch({ type: 'UPDATE', targetId });
  // };

  // const onDelete = (targetId) => {
  //   onDispatch({ type: 'DELETE', targetId });
  // };

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
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id === targetId) {
  //         return { ...todo, isDone: !todo.isDone };
  //       }
  //       return todo;
  //     }),
  //   );
  // };
  // const onUpdate = (targetId) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === targetId
  //         ? { ...todo, isDone: !todo.isDone }
  //         : todo,
  //     ),
  //   );
  // };

  // const onDelete = (targetId) => {
  //   setTodos(todos.filter((todo) => todo.id !== targetId));
  // };

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      <Exam />
      <Header />
      <TodosStateContext.Provider value={todos}>
        <TodosDispatchContext.Provider
          value={memoizedDispatch}
        >
          <Editor />
          <List />
        </TodosDispatchContext.Provider>
      </TodosStateContext.Provider>
    </div>
  );
}

export default App;
