import "./App.css";
import { useState } from "react";
import Bulb from "./components/Bulb";
import Counter from "./components/Counter";

// 1. State와 Props

// 부모 컴포넌트에서 렌더링된 light값을 전달 받아 orange / gray변경
// 즉 -> 부모 컴포넌트에서 onClick으로 리렌더링 값이 자식 컴포넌트 Bulb에 전달됨
// 자식 컴포넌트의 props값이 부모로부터 바뀌게 되면 리렌더링이 발생
// const Bulb = () => {
//   const [light, setLight] = useState("off");
//   console.log(light);

//   return (
//     <div>
//       {light === "on" ? (
//         <h1 style={{ backgroundColor: "orange" }}>on</h1>
//       ) : (
//         <h1 style={{ backgroundColor: "gray" }}>off</h1>
//       )}

//       <button
//         onClick={() => {
//           setLight(light === "off" ? "on" : "off");
//         }}
//       >
//         전원{light === "off" ? "on" : "off"}
//       </button>
//     </div>
//   );
// };

// Bulb 자식 컴포넌트로 App2에 배치
// props로 App2 컴포넌트의 light state 초기값 전달

// 주의
// 아래 숫자를 증가시키는 버튼에 리렌더링이 발생하면 자식 컴포넌트인 Bulb에 영향을 줌

//  - 리렌더링 발생 기준
//   1) 자신이 관리하는 state값이 변경되었을때
//   2) 자신이 제공받는 props값이 변경되엇을때
//   3) 부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 리렌더링
// -> 코드작성 시 자식 컴포넌에게 영향을 주는 코드는 분리해서 작성

// 코드가 중복되어 Bulb()랑 합쳐서 코드작성

// 더나아가 모듈화로 파일분리진행
// const Lighter = () => {
//   const [light, setLight] = useState("off");

//   return (
//     <div>
//       <Bulb light={light} />
//       <button
//         onClick={() => {
//           setLight(light === "off" ? "on" : "off");
//         }}
//       >
//         전원{light === "off" ? "on" : "off"}
//       </button>
//     </div>
//   );
// };

// const Counter = () => {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button
//         onClick={() => {
//           setCount(count + 1);
//         }}
//       >
//         +
//       </button>
//     </div>
//   );
// };

function App2() {
  // const [count, setCount] = useState(0);
  // const [light, setLight] = useState("off");

  return (
    <>
      <Bulb />
      <Counter />
      {/* <div>
        <Bulb light={light} />
        <button
          onClick={() => {
            setLight(light === "off" ? "on" : "off");
          }}
        >
          전원{light === "off" ? "on" : "off"}
        </button>
      </div>
      <Counter /> */}
      {/* <div>
        <h1>{count}</h1>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div> */}
    </>
  );
}
// 주의할점
// -> onClick의 매개변수 count는 state가 아니라 이베트 객체(event)이기 때문에 주의
// -> onClick={(count) => {seCount(count + 1)}}이런식으로 작성할경우
//   -> 기존 state변수 count를 매개변수 이름으로 가려버린(shadowing) 상태

// React에서 onClick 동작원리
// - onClick에 전달되는 함수인자
// onClick={(e) => {...}}
// - React는 클릭 이벤트가 발행하면 자동으로 이벤트 객체(SyntheticEvent)를 처 번째 인자로 전달
// 즉 -> (count) => {...} === (event) => {...} 같은맥락

export default App2;
