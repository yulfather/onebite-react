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

// 1. 상태(State)란 무엇?
// -> 상태란 시간이 지나면서 변할 수 있고, 그 변화가 UI에 반여되어야 하는 값
// - 클릭횟수, 로그인여부, 입력창 값, 모달 여림/닫힘 상태
//  -> 이런 값들은 단순 변수(let, const)로 관리하면 값은 바뀌어도 화면은 바뀌지 않음
//  -> React는 "상태가 변경될 때만 렌더리" 하도록 설계

// 2. useState()의 역할
// const [count, setCount] = useState(0);
//  -> useState()는 내부적으로 3가지 역할

//  1) 상태값 저장(Count)
//   - count라는 상태값을 React가 내부적으로 저장
//   - 초기값은 0

//  2) 상태 변경 함수 제공(setCount)
//   - setCount()가 호출
//    -> React는 상태가 바뀌었다고 판단
//    -> 해당 컴포넌트를 다시 실행

//  3) 상태 변경 시 리렌더링 드리거
//   - setCount()가 호출되면
//    -> React는 상태가 바뀌었다고 판다.
//    -> 해당 컴포넌트를 다시 실해(렌더링)

// 3. 왜 일반 변수로는 안된나?

// let count = 0;
// function handleClick() {count += 1;}
//  -> 값은 증가, React는 변경 사실 모름, 화면은 그대로 유지

// React에서 제공되는 useState() 함수 사용
// const [count, setCount] = useState(0);
// function handleClick() {setCount(count + 1);}
//  -> React가 상태 변경인지, 컴포넌트 재실행, 변경된 값 UI반영

// 4. 구조분해와의 관계
// const stateArray = useState(0);
// stateArray = [현재상태 초기값, 현재상태 초기값 변경함수]
// const count = stateArray[0];
// const setCount = stateArray[1];
//  - useState(초기값)는 [상태초기값, 상태초기값 변경함수]배열을 반환
//  - 우리는 배열 구조분해로 이름을 붙여 쓰는 것

// 5. 한 문장으로 요약
// useState()는 컴포넌트가 기억해야 할 값을 React에게 맡기고,
// 그 값이 바뀌면 자동으로 화면을 다시 그리게 만드는 장치이다.

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
