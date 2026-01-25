import "./App.css";
import { useState, useRef } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";

// 기능구현
// -> Editor 컴포넌트에서 입력한 새로운 Todo가
// -> List 컴포넌트에 TodoItem으로 추가되는 구조
// -> 추가된 TodoItem들이 List 컴포넌트에서 수정, 삭제되도록 구현
// -> Todo item들의 데이터를 스테이트로 만들어 보관

// 스테이트를 만들위치
// -> 스테이트를 이용하는 모든 컴포넌들으 조상 컴포넌트 App

// mockData - 초기데이터
// 아래 객체는 리렌더리에 따른 재생성이 필요없는 데이터라 전역에 배치함
// 그리고 const로 상수이기 때문에 값을 변경할 필요가 없음
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
    content: "nextjs 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "javascript 공부하기",
    date: new Date().getTime(),
  },
];

function App() {
  // mockDate의 값으로 App컴포넌트 내부 state의 todos 초기값으로 설정
  const [todos, setTodos] = useState(mockData);

  // id값을 고유값으로 저장하기 위한 reference객체를 생성
  const idRef = useRef(3);

  // 새로운 Todo를 입력하고 List에 추가하기
  // 추가하기 하였을때 todos state값을 변경하여야 한다.
  // todos값을 바꿀려면 setTodos를 호출하여 초기데이터 변경
  // Editor에 입력한 값을 content로 받아와 기존 객체형태와 동일한구조로 만들어야됨
  const onCreate = (content) => {
    const newTodos = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    // todos와 같은 state값은 상태변화 함수인 setTodos로 변경해야
    // 변경된 state값을 리액트가 감지하여 컴포넌트를 정상적으로 리렌더링 할 수 있다.
    setTodos([newTodos, ...todos]);
  };

  // isDone이라는 프로퍼티에 check박스 토글로 false라면 True, true라면 false로 변경
  const onUpdate = (targetId) => {
    // todos State의 값들 중
    // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경

    // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  };

  const onDelete = (targetId) => {
    // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  // Editor컴포넌트에 onCreate 이벤트헨들러 함수를 props로 전달
  // 저장된 data todos로 List에 전달
  // check박스가 적용될 자식 컴포넌에게 onUpdate전달

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
