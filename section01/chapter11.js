// 1. 함수선언
function greeting() { // 함수선언 function(){}
  console.log("안녕하세요"); // console출력 (호출 4)
} // (선언 1)
console.log("호출전"); // (호출 2)
greeting(); // 함수호출(호출시 반드시 소괄호) (호출 3)
console.log("호출후"); // (호출 5)

// 직사각형의 넓이를 구하는 함수(고정됨)
function getArea1() {
  let width = 10;
  let hight = 20;
  let area = width * hight;
  console.log(area); // 200
}
getArea1();

// 동적으로 사용가능한 직사각형 함수
function getArea2(width, hight) {
  let area = width * hight;
  console.log(area); //200
}
getArea2(10, 20);
getArea2(20, 30);

// return을 사용하여 값을 반환하게 만들어 보자
function getArea4(width, hight) {

  // 함수 안에서 다른함수 호출가능
  function another() {
    console.log("hi evry one");
  }
  another();

  // 함수안에서 return을 만나면 call stack상 함수가 종료됨
  // 따라서 return아래 코드는 실행되지않음
  return width * hight; // 반환값 - 함수 호출에 결과값

  console.log("hello") // 실행안됨
}
console.log(getArea4(40, 20));
//800
//hi evry one

console.log(getArea4(30, 20));
//600
//hi evry one

// 콜백함수로 구현
function getArea3(callback) {
  callback(10, 20)
}
getArea3(function(width, hight) {
  let area = width * hight;
  console.log(area);
})

// 함수의 호이스팅 -> 끌어올리다 라는 뜻 
// 선언이 먼저 처리되는 메모리 로딩 단계의 동작
// 자바스크립트 엔진이 코드 실행 전 변수/함수 선언을 먼저 메모리에 등록하는 과정

// 중요포인트
// - 코드가 위로 이동하는 것이 아님
// - 실행 순서가 바뀌는 것이 아님
// - 선언만 먼저 "인식" 되는 것

// 호출 시점으로 끌어올려 실행이 아니라
// "실행 전에 이미 준비되어 있었기 때문"
hello(); // 실행
function hello() {console.log("안녕하세요");} // 이미 메모리 등록

// 함수 표현식(function Expression)은 호이스팅이 다름
// 에러발생
hello1();
const hello1 // hello 변수는 호이스팅됨
= function() {console.log("안녕하세요");} // 값(함수)은 할당되지 않음
// -> TDZ(Temporal Dead Zone)상태
// hello -> 존재는 하지만 초기화 안되 -> 접근불가

// 호이스팅 비교
// 구분                  호이스팅여부      호출가능
// 함수선언문             함수전체호이스팅   가능
// 함수표현식(var)        변수만호이스팅     불안정
// 함수표현식(let/const)  TDZ              불가
// 화살표함수             함수아님(표현식)   불가