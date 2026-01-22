import { useState, useRef, useEffect } from "react";
import useInput from "./../hooks/useInput";
// 1. React Hooks - 낚아채다
// -> 클래스 컴포넌트의 기능을 함수 컴포넌트에서도 이용할 수 있도록

// 3가지 hook 관련된 팁
// 1). 훅은 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
// 2). 조건부로 호출될 수 없다.
// 3). 나만의 훅 (custom hook) 직접 만들 수 있다.

// 1-1. React Hooks가 하는 일 한 문장 요약
// - 함수 컴포넌트가 렌더링 사이클(렌더 -> 커밋)동안 "상태/부수효과/메모이제이션/외부컨텍스트"
//   같은 기능을 안정적으로 유지하도록, React가 컴포넌트 인스턴스에 연결된 저장소를 제고하는 API

// 1-2. 내부 작동 원리 핵심
//  -> "렌더링마다 함수는 다시 실행되는데, 값은 어디?"
// - 함수 컴포넌트는 렌더링될 때마다 함수 자체가 다시 호출
// - usState, useRef 같은 값이 유지되는 이유
//  -> 값이 함수 로컬 변수에 저장 X
//  -> React 내부의 "컴포넌트 단위 저장소"에 저장

// React내부 관점(개념 모델)
// - React는 컴포넌트마다 "Fiber(인스턴스 같은 것)"를 가지고 있다.
// - Fiber에 "Hook 목록(연결 리스트)"을 붙여 관리
// - 렌더링 중에는 "현재 처리 중인 Fiber"와 "현재 처리 중인 Hook위치"를 가리키는 포인터가 움지임
// - 그래서 "Hooks는 호출 순서가 곧 식별자가 됨"

// -> 따라서 다음 규칙이 생김

// Hooks 규칙이 생기는 이유(내부구조 기반)
// - 조건문/반복문 안에서 hook호출 금지
//  -> 호출 순서가 바뀌면 "이번 렌더에서 2번째 훅"이
//     "저번 렌더의 2번째 훅"과 다른 훅이 되어 데이터가 꼬임
// - 컴포넌트 최상단에서만 호출 -> 호출 순서 고정

// Hook별 "작동원리" + 내부관점 + 예제

// A. useState - State 기능을 낚아 채오는 Hook
// - 작동원리
//  - 상태값을 React 저장소에 보관
//  - setState호출 -> React가 "업데이트 큐"에 넣고 -> 다음 렌더에서 반영
function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value })); // 모든 업데이트 안전하게 누적
    // setForm((prev) => {return {...prev, [name]: value}}) 중괄호를 안쓰려면 이런식으로 표현
    // setForm({...form, [name]: value}) 직접전달 방식은 불변성의 법칙으로 오류가능성이 높음
  };
  // 포인트: setForm(prev => ...)형태(함수형 업데이트)는 동시성/배치 업데이트에서 안전

  return (
    <>
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="password" value={form.password} onChange={handleChange} />
      <p>--------------------------------</p>
    </>
  );
}

// B. useRef - Reference 기능을 낚아 채오는 Hook
// 작동원리
// {current: ...} 객체를 한 번 만들고 계속 유지
// .current 변경은 렌더 트리거가 아님 (UI 반영 목적이 아니라 "값 보관/DOM 참조"에 적합)
// 실무 예제: DOM포커스 + 렌더 없이 값 누적
function Demo() {
  const inputRef = useRef(null);
  const clickCountRef = useRef(0);

  const focusAndCount = () => {
    clickCountRef.current += 1;
    inputRef.current?.focus();
    console.log("clickCountRef: ", clickCountRef.current);
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusAndCount}>Focus</button>
    </>
  );
}

// C. useEffect
// 작동원리(렌더/커밋관점)
//  - 렌더링 중에는 "무엇을 해야한다"를 등록만 함
//  - 실제 DOM 반영(커밋) 이후에 effect가 실행
//  - 의존성 배열이 바뀌면 이전 effect cleanup -> 새 effect실행

// 실무예제: 이벤트 구독 / 해제
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function onResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize: ", onResize);
    return () => window.removeEventListener("resize: ", onResize);
  }, []);

  return <div>width: {width}</div>;
}

// 0) 코드의 목적
//  - 최초 렌더 시 window.innerWidth를 읽어 width 상태로 저장
//  - 창 크기가 바뀔 대마다 setWidth(window.innerWidth) 실행
//  - 그 결과 컴포넌트가 재렌더되고 <div>width: ...</div>가 최신값으로 갱신

// 1) 최초 마운트(첫 화면 표시) 때: 단계별

// 1-1. 함수 컴포넌트 호출(렌더 단계)
//  -> React가 WindowWidth()를 실행
// const [width, setWidth] = useState(window, innerWidth);
// - 여기서 벌어지는 일:
//  -> 브라우저에서 현재 창너비를 읽는다(window.innerWidth)
//  -> useState(초기값)이 "초기 렌더에서만" 그 값을 상태로 저장
//  -> 반환값:
//   \> width = 초기 너비 값
//   \> setWidth = 나중에 width를 바꾸는 함수
//  -> 중요한 포인트: useState(initial)의 initial은 첫 렌더에서만 상태 슬롯을 채움

// 1-2. JSX반환(렌더 결과 생성)
// return <div>width: {width}</div>
// - React는 이 결과로 "가상 트리(React element)"를 만들고, 이전 화면과 비교 준비

// 1-3. DOM반영(커밋)
// - React가 실제 DOM에 <div>를 붙임
// - 화면에 whidth: 1200 같은 값이 표시

// 2) useEffect등록과 실행: "언제 실행되나"
// useEffect(() => {
//   function onResize() {
//     setWidth(window.innerWidth);
//   }

//   window.addEventListener("resize: ", onResize);
//   return () => window.removeEventListener("resize: ", onResize);
// }, []);

// 2-1. 렌더 중에는 실행되지 않는다.
// - useEffect 콜백은 렌더 중에 바로 실행되지 않습니다.
// - 렌더 중에는 "이 이펙트를 나중에 실행해야 한다"라고 React가 등록만 해둠

// 2-2. 커밋이후(브라우저 페인트 이후)에 실행
// - DOM이 실제로 붙고 화면이 반영된 뒤에 React가 effect를 실행
// - 이 시점에 아래가 실행

// (1) onResize함수실행
//   function onResize() {
//     setWidth(window.innerWidth);
//   }
//  -> 이 함수는 "resize 이벤트가 발행했을 때 실행할 헨들러"

// (2) resize 이벤트 구독
//  window.addEventListener("resize: ", onResize);
//  -> 이제부터 브라우저 창 크기가 바뀌면 브라우저가 onResize를 호출

// (3) cleanup 함수반환(등록)
//  return () => window.removeEventListener("resize: ", onResize);
//  -> React는 이 함수를 저장해 두었다가 실행
//   \> 컴포넌트가 사라질 때(unmount)
//   \> 또는 effect를 다시 실행하기 직전(의존성 변경 시)

// 3) 왜 의존성 배열이 []인가
// }, []);
// 의미:
//  - "이 effect는 처음 마운트될 때 한 번만 실행"
//  - 그리고 cleanup은 언마운트 때 한 번 실행
// 동작요약:
//  - 마운트: addEvenListener 1회
//  - 언마운트: removeEventListener 1회

// 나만의 custom hook 만들기
// -> 각각의 컴포넌트마다 useState로 만들고 OnChange등 이벤트 헨들러 설정을 반복하게됨
// -> 커스텀 훅을 만들려는 함수명앞에 "use"를 붙여 사용
// -> 일반적인 실무에서는 src폴더에 hooks 전용폴더를 만들어서관리
// function useInput() {
//   const [input, setInput] = useState("");

//   const onChange = (e) => {
//     setInput(e.target.value);
//   };

//   return [input, onChange];
// }

const HookExam = () => {
  // 나만의 커스텀훅을 컴포넌트 내부에서 구조분해할당으로 받아오기
  const [input, onChange] = useInput();
  const [input2, onChange2] = useInput();

  return (
    <>
      <div>hookExam</div>
      <div>
        <WindowWidth />
      </div>
      <div>
        <input value={input} onChange={onChange} />
        <input value={input2} onChange={onChange2} />
      </div>
      <LoginForm />
      <Demo />
    </>
  );
};

export default HookExam;
