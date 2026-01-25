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

  // Editor컴포넌트에 onCreate 이벤트헨들러 함수를 props로 전달

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List />
    </div>
  );
}

export default App;
