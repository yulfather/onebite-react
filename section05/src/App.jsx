import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Parent from "./components/Props";

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

// props에 전달할 값이 여러종류라면
// 객체화하여 스프레드 연산 방식으로 값 전달 가능
// HTML요소나 React컴포넌트 까지 전달가능
//  -> 닫는 테그를 별도로 만들어서 사용<button><p>내용</p></button>
//  -> HTML요소는 자식 컴포넌트 props로 자동 전달됨 -> children
function App() {
  const buttonProps = {
    text: "뉴스",
    color: "green",
    a: 1,
    b: 2,
    c: 3,
  };

  return (
    <>
      <Button text={"메일"} color={"red"} />
      <Button text={"카페"} color={"yellow"} />
      <Button text={"블로그"} color={"blue"} />
      <Button {...buttonProps} />
      <Button text={"게임"} color={"pink"}>
        <div>자식요소</div>
      </Button>
      <Button text={"헤더"}>
        <Header />
      </Button>
      <Parent />
      <Main />
      <Header />
      <h1>안녕 soyul</h1>
      <Footer />
    </>
  );
}

export default App;
