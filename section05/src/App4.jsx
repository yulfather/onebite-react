import "./App.css";
import Register from "./components/Register";
import { InputExample1, InputExample2 } from "./components/InputExample";
import LoginForm from "./components/LoginForm";
import NewRegister from "./components/NewRegister";
import AppRef from "./components/AppRef";
import RefRegister from "./components/RefRegister";

// State로 사용자 입력 관리하기1

function App4() {
  return (
    <>
      <RefRegister />
      <AppRef />
      <NewRegister />
      <LoginForm />
      <InputExample2 />
      <InputExample1 />
      <Register />
    </>
  );
}

export default App4;
