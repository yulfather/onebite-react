import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

// component
// javascript함수가 html코드를 반환하도록 하는 함수
// component를 생성하는 함수를 만들때 함수명의 첫글자는 대문자로 작성

// 자식 component -> 모듈화 진행
// function Header() {
//   return (
//     <header>
//       <h1>header</h1>
//     </header>
//   );
// }

// 부모 component(뿌리라하여 root component라고 한다.)
function App() {
  return (
    <>
      <Header />
      <Main />
      <h1>안녕 soyul</h1>
      <Footer />
    </>
  );
}

export default App;
