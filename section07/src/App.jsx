import "./App.css";
import Viewer from "./components/Viewer";
import Controller from "./components/Controller";
import { useState, useEffect } from "react";

// 1. 라이프 사이클
// -> 컴포넌트가 태어나서 -> 업데이트되고 -> 사라질때까지의 전체 흐름
//  -> 마운트(Mount) -> 업데이트(Update) -> 언마운트(Unmount)

// 1-1. 핵심 3단계
// Mount : 컴포넌트가 처음 확면에 등장
// Update: state/props 변경으로 재렌더링
// Unmount: 컴포넌트가 화면에서 제거

// 2. 함수 컴포넌트 기준 라이프사이클
// -> React에서 "라이프사이클 제어의 핵식음 useEffect"

// 2-1. Mount(컴포넌트 최초 등장)
//  -> 언제? - 컴포넌트가 처음 렌더링될 때 1번
//  -> 구현? - useEfect(callback, array)
//  -> 왜[array]? - 의존성 배열이 비어있으면(처음 1번만 실행됨)

// useEffect(() => {
//   console.log("마운트됨");
// }, [])

// 실무예제
//  -> api 최초 호출, 이벤트 등록, 초기 데이터 세팀
// useEffect(() => {
//   fetch("/api/user");
// }, []);

// 2-2. Update(stat/props변경)
// -> 언제? state, props 변경 부모 컴포넌트 리렌더링

// - 특정 state 변경 시 -> count가 바뀔 때만 실행
// useEffect(() => {
//   console.log("count 변경됨")
// }, [count]);

// - 여러 값 감시
// useEffect(() => {
//   console.log("count 또는 name 변경됨")
// }, [count, name]);

// - 의존성 배열을 생략하면
// useEffect(() => {console.log("매 렌더링 마다실행")})
//  -> 모든 렌더링마다 실행 -> 실무에서 거의 안씀

// 3. Unmount(컴포넌트 제거)
//  -> 언제? 조건부 렌더링 종료, 페이지 이동, 컴포넌트 삭제
//  -> 구현
// useEffect(() => {
//   console.log("마운트");
//   return () => {
//     console.log("언마운트");
//   }
// }, [])

// - 실무에서 진짜 중요함
//  -> 이벤트 제거, 타이머 정리, 메모리 누수방지
// useEffect(() => {
//   const timer = setInterval(() => {
//     console.log("tick");
//   })

//   return () => {
//     clearInterval(timer);
//   }
// }, []);

// 4. 렌더링과 라이프사이클의 관계(중요)
//  -> 핵심 : 렌더링 ≠ 마운트
// 상황	         발생
// state변경	   렌더링 + 업데이트
// props변경	   렌더링 + 업데이트
// 첫진입	        렌더링 + 마운트
// 컴포넌트 제거	 언마운트

// 5. 실무에서 꼭 기억할 핵심 요약
// - 핵식포인트
//  -> 라이프사이클  = 컴포넌트의 생애주기
//  -> 함수 컴포넌트는 useEffect 하나로 제어
//  -> cleanup 함수는 업데이트 & 언마운트 전에 실행
//  -> 의존성 배열이 라이프사이클을 결정
// - 한줄요약
//  -> "언제 실행되고, 언제 정리해야 하는가를 제어하는 게 라이프사이클이다"

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [width, setWidth] = useState(window.innerWidth);

  // useEfect(callback, array) 첫번째 인수로 콜백함수, 두번째 인수 배열
  // -> 왜[array]? - 의존성 배열이 비어있으면(처음 1번만 실행됨)
  // -> 의존성배열 dependency array(deps)
  useEffect(() => {
    console.log(
      `마운트 & count변경 : ${count} / input: ${input} / width: ${width}`,
    );

    const onResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", onResize);
    return () => {
      console.log("정리(cleanup)");
      window.removeEventListener("resize", onResize);
    };
  }, [count, input, width]);
  // 실행 순서:
  // 1). 첫렌더 -> count: 0
  // 2). effect실행
  // 3). 버튼 클릭
  // 4). cleanup 먼저 실행
  // 5). 새로운 effect 실행
  // -> 업데이트 시엔 항상 cleanup -> effect순서

  const onClickButton = (value) => {
    setCount(count + value);
  };

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <div>width : {width}</div>
      </section>
      <section>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </section>
      <section>
        <Viewer count={count} />
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App;
