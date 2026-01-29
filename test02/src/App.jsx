import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import Exam from "./components/Exam";
import { useState, useRef } from "react";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "react 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "Typescript 학습하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "nextJS 언제공부하냐",
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
  };

  // map() → 개수는 그대로, 내용만 수정
  // -> todos 배열의 길이는 그대로 유지 특정 id를 가진 객체 하나만 수정 나머지는 그대로 유지
  // -> map의 특징
  //  -> 배열길이 = 원본과 동일
  //  -> 각 요소를 다른 값으로 "변환"가능

  // filter() → 개수 자체를 줄이거나 제거
  // -> 특정 id를 가진 객체를 완전히 제거 결과 배열의 길이가 줄어듦
  // -> filter()의 특징
  //  -> 조건을 통과한 요소만 남김
  //  -> 조건을 통과 못 하면 아예 사라짐
  const onUpdate = (targetId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  };

  const onDelete = (targetId) => {
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <div className="App">
      <Exam />
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
