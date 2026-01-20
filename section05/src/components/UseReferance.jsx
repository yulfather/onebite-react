import { useRef, useState } from "react";

// 1. useRef란?
// -> useRef는 렌더링과 무관하게 유지되는 '컴포넌트 전용 변수'를 만드는 React Hook
//  - 값이 변경되어도 리렌더링이 발생하지 않음
//  - 컴포넌트가 언마운트될 때까지 값이 유지됨
// const ref = useRef(initialValue);

// 2. useRef의 내부구조(핵심원리)
// const ref = useRef(0); -> ref = {current: 0}(이때 생성되는 구조)
//  - 핵심 포인트
//   -> useRef는 객체를 반환
//   -> React는 이 객체를 매 렌더링마다 동일한 객체로 유지
//   -> 변경 대상은 오직 ref.current(ref.current = 10 // 가능)

// 3. useRef vs State (가장 중요한 비교)
// 구분	         useState	         useRef
// 값 변경 시	    리렌더링 발생	      리렌더링 없음
// 값 유지	      유지됨	           유지됨
// 렌더링에 영향	 O	               X
// 주 용도	      UI에 보여지는 상태	로직용 변수 / DOM 접근

// 4. useRef가 "컴포넌트의 변수"인 이유
// 일반변수: let count = 0; -> 렌더링 마다 초기화
// useRef: const countRef = useRef(0); -> 렌더링 마다 값유지

function App() {
  let normal = 0;
  const ref = useRef(0);
  const [, setRender] = useState(0);

  const click = () => {
    normal++;
    ref.current++;
    setRender((prev) => prev + 1);
    console.log(normal, ref.current);
  };

  return (
    <div>
      <button onClick={click}>
        눌러 {normal} vs {ref.current}
      </button>
      <p>---------------------------</p>
    </div>
  );
}
// 결과
//  - normal -> 항상 1
//  - ref.current -> 1, 2, 3, ......

// 5. useRef의 대표적인 사용 목적 3가지

// 1) DOM 직접접근
// const inputRef = useRef(null);
// <input ref={inputRef} />
// inputRef.current.focus();
// -> 포커스, 스크롤, 크기측정
// -> document.querySelector 대체

// 2) 렌더링과 무관한 값 저장
// const prevValue = useRef(null);
// useEffect(() => {
//   prevValue.current = value;
// }, [value])
// -> 이전 값 저장, 타이머 ID, interval, timeout관리

// 3) 최초 1회만 실행 제어 - 최초 렌더 제외 패턴
// const isMounted = useRef(false);
// useEffect(() => {
//   if(!isMounted) {
//     isMounted.current = true;
//     return;
//   }
//   console.log("update run");
// });

// 6. useRef 한 문장 요약
//  -> useRef는 "렌더링에 관여하지 않는 컴포넌트 전용 변수"를 만들기 위한 Hook

// 7. 언제 useRef를 쓰면 되는가(판단기준)
// - 화면 변경 필요 없음
// - 값은 유지되어야 함
// - DOM을 직접 제어해야 함
// - 렌더링 성능을 건드리고 싶지 않음

export default App;
