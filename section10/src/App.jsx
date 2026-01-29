import './App.css';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import { useReducer, useRef, useState } from 'react';

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

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onDispatch = (action) => dispatch(action);

  const onCreate = (content) =>
    onDispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });

  const onUpdate = (targetId) =>
    onDispatch({ type: 'UPDATE', targetId });

  const onDelete = (targetId) => {
    onDispatch({ type: 'DELETE', targetId });
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List
        todos={todos}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
}
export default App;
