import "./App.css";
import Register from "./components/Register";
import { InputExample1, InputExample2 } from "./components/InputExample";
import NewRegister from "./components/NewRegister";
import AppRef from "./components/AppRef";
import RefRegister from "./components/RefRegister";
import HookExam from "./components/HookExam";

// State로 사용자 입력 관리하기1

function App4() {
  return (
    <>
      <HookExam />
      <RefRegister />
      <AppRef />
      <NewRegister />
      <InputExample2 />
      <InputExample1 />
      <Register />
    </>
  );
}

export default App4;
