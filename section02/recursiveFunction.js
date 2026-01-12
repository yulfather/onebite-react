// 1. 재귀함수란
//  -> 재귀함수는 함수가 자기 자신을 다시 호출하는 구조
// 1-1. 종료조건(Base Case): 더 이상 자기 자신을 호출하지 않는 조건
// 1-2. 재귀호출(Recursive Case): 문제를 더 작은 문제로 나누어 자기 자신을 호출

// 2. 재귀함수의 동작원리(Call Stack관점)
// 재귀는 반복문처럼 "한 줄식" 실행되는 것이 아니라,
// 호출스택(Call Stack)에 함수 실행 컨텍스트가 쌓였다가(LIFO) 역순으로 반환

// 예제: 숫자 카운트
function countDown(n) {
  if(n === 10) {
    console.log("end");
    return;
  }
  console.log(n);
  countDown(n + 1);
}
countDown(0);