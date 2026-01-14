// 동기와 비동기

// 1. 동기(Synchronous) 실행의 본질
// 핵심정의
// - 한 번에 하나의 작업만 실행
// - 앞의 작업이 끝나야 다음 작업이 시작
// - 실행 흐름이 위 -> 아래로 직선적

// 동기코드예제
console.log("A"); // 실행순서 1
console.log("B"); // 실행순서 2
console.log("C"); // 실행순서 3

// 동기의 한계
function block() {
  let start = Date.now();
  while (Date.now() - start < 3000) {} // 3초 블로킹
}

console.log("시작");
block();
console.log("끝");
// block()이 실행되는 동안 전체 프로그램이 멈춤
// UI, 이벤트, 입력 전부 정지
// -> 이 문제를 해결하기 위해 비동기 모델이 필요

// 2. 비동기(Asynchronous)의 핵심 개념
// 핵심정의
// -작업을 맡겨두고 다음 코드 계속실행
// -완료 시점에 알림(callback / promise / async)으로 처리
// Javascript는 싱글 스레드 + 비동기 구조

// Javascript는 멀티 스레드라서 비동기가 아니다.
// Javascript는 Event Loop기반 비동기 처리이다.

// 구성 요소 정리
// 구성요소	      역할
// Call Stack	   현재 실행 중인 함수
// Web APIs	     setTimeout, fetch 등 비동기 작업 처리
// Callback      Queue	완료된 비동기 콜백 대기
// Microtask     Queue	Promise.then, async/await
// Event Loop	   Stack이 비면 Queue → Stack 이동

// 3. 비동기 실행을 코드로 해부
// 예제 1: setTimeout 기본구조
console.log(1); // 실행순서 1

// 비동기 함수
setTimeout(() => {
  console.log(2); // 실행순서 3 - 마지막으로 실행
}, 2000);

console.log(3); // 실행순서 2

// 4. 실행 과정을 단계별 시각화

// ① call Stack실행
// Call Stack
// ----------
// console.log("1")
// console.log("3")

// ② setTimeout 처리
// setTimeout → Web API 로 이동
// (타이머 대기)

// ③ Web API 완료
// Callback Queue
// --------------
// () => console.log("2")

// ④ Event Loop 개입
// Call Stack 비어 있음 ✔
// → Callback Queue → Call Stack

// ⑤ 최종 실행
// console.log("2")

// 5. Promise & Microtask Queue(중요)
// Promise예제
console.log("A"); // 실행순서 1

Promise.resolve().then(() => {
  console.log("B"); // 실행순서 3
});

console.log("C"); // 실행순서 2

// setTimeout 과 함께 사용하면?
console.log("A"); // 실행순서 1
setTimeout(() => {
  console.log("B"); // 실행순서 4
}, 0);
Promise.resolve().then(() => console.log("C")); // 실행순서 3
console.log("D"); // 실행순서 2
// 이유(핵심)
// - Microtask Queue(Promise)는
// - Callback Queue(setTimeout)보다 우선순위가 높음

// 6. async / await
// 본질 - Promise를 동기 코드처럼 보이게 만든 문법
async function run() {
  console.log("1"); // 실행순서 1
  await Promise.resolve();
  console.log("2"); // 실행순서 3
}
run();
console.log("3"); // 실행순서 2
// 내부 변환개념
// Promise.resolve().then(() => {console.log("2");});
//  -> awit 이후 코드는 Microtask Queue로 이동

// 반드시 기억해야 할 한 문장
// Javascript의 비동기는 "동시에 실행"이 아니라
// "나중에 실행할 수 있도록 구조적으로 분리한 것"
