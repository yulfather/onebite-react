// 미니 React: useState 내부 구조코드

// 1) Hook상태 저장소
let hookStates = []; // 각 useState의 값들이 저장되는 배열
let hookIndex = 0; // 현재 렌더에서 몇 번째 hook인지 가리키는 포인터

// 2) 렌더링 트리거
function scheduleRender(renderFn) {
  // 실제 React는 Fiber 스케줄러로 비동기/우선순위 처리 등을 함
  // 여기서는 단순하게 "다시 렌더"를 즉시 호출한다고 가정
  hookIndex = 0; // 렌더 시작 전 hookIndex 초기화가 매우중요
  renderFn();
}

// 3) useState 구현(단순화 버전)
function useState(initialValue) {
  const currentIndex = hookIndex;

  // 최초 렌더일 때만 초기값을 저장
  if (hookStates[currentIndex] === undefined) {
    hookStates[currentIndex] = initialValue;
  }

  // 상태 변경 함수는 "자기 슬롯(index)"을 기억(클로저)
  function setState(nextValue) {
    const prev = hookStates[currentIndex];

    // nextValue가 함수면 (함수형 업데이트) 호출해서 다음 상태 계산
    const valueToStore =
      typeof nextValue === "function" ? nextValue(prev) : nextValue;

    hookStates[currentIndex] = valueToStore;

    // 상태가 바뀌었으니 리렌더 예약
    scheduleRender(App);
  }

  // 다음 hook을 위해 index 증가
  hookIndex++;

  return [hookStates[currentIndex], setState];
}

// 4) 사용 예시
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("soyul");

  console.log("render: ", { count, name });

  // 예시로 버튼 클릭을 가정한 호출
  if (count < 2) {
    setCount((c) => c + 1);
  }

  // 최초렌더
  scheduleRender(App);
}

// 이 코드가 보여주는 포인트:
//  - hookStates 배열이 상태 저장소
//  - hookIndex가 호출 순서를 기억하는 키
//  - setState는 currentIndex를 클로저로 기억해서 "자기 상태 칸"을 업데이트
//  - 상태 업데이트 후 scheduleRender()로 리렌더
