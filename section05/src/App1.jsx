import "./App.css";
import { useState } from "react";

// 1. State로 상태관리하기
//  -> 현재 가지고 있는 형태나 모양을 정의 변화할 수 있는 동적인 값
// State를 갖는 React컴포넌트 -> State의 값에 따라 렌더링 되는 UI가 결정된다.

// 1-1. State를 생성하려면 : import {useState} from "react";

// useState()를 호출한 값을 state에 할당하여 console.log(state);
// 반화값은 [0, ƒ] -> useState는 두개의 요소를 반환
// 실무 설정 : 구조분해할당  const [count, setCount] = useState();
// 배열의 첫번째 요소는 새롭게 생성된 state에 초기값 useState(초기값)
// 배열의 두번째 요소 초기값을 변환 시키는 함수 setCount(count + 1);
function App1() {
  const [count, setCount] = useState(0);

  const [light, setLight] = useState("off");

  console.log(count);

  return (
    <>
      <div>
        <h1>{light}</h1>
        <button
          onClick={() => {
            setLight(light === "off" ? "on" : "off");
          }}
        >
          전구{light === "off" ? "on" : "off"}
        </button>
      </div>
      <div>
        <h1>{count}</h1>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
    </>
  );
}

export default App1;
