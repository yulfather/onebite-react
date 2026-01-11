// 단락평가
// 단락평가란 논리 연사자(&&, ||)가 결과를 이미 확정되는 순간,
// 나머지 표현식을 평가하지 않고 중단하는 동작 방식

// &&: 하나라도 false면 전체는 false, 전부 true여야 true
// ||: 하나라도 true면 전체는 true, 전부 false여야 false
//  -> 그래서 뒤의 코드를 실행하지 않을 수 있다.

// AND(&&)
// A && B
// A가 falsy -> B는 아예 실행되지 않음
// A가 truthy -> B실행
// 마지막으로 평가된 값이 반환됨
false && console.log("실행 안 됨"); // console.log 실행❌
true && console.log("실행됨") // 실행✅

// OR(||)
// A || B
// A가 truthy -> B는 아예 실행되지 않음
// A가 falsy -> B실행
// 마지막으로 평가된 값이 반환됨
true || console.log("실행 안 됨"); // console.log 실행❌
false || console.log("실행됨"); // 실행✅

// 반환값의 정체(중요)
// javascript의 &&, ||는 boolean을 반환하지 않는다
//  -> 평가가 멈춘 그 값을 그대로 반환
// ||, &&는 boolean을 반환하지 않을 뿐 피연산자 평가 자체는 필요하면 실행
// 단란평가란 "필요 없으면 안 실행"이지 "무조건 안 실행"이 아니다.
const and1 = "hello" && "world";
const and2 = "" && "hello world";
console.log(and1); // world
console.log(and2); // ""

const or1 = "" || "hello world";
const or2 = "hello" || "world";
console.log(or1); // hello world
console.log(or2); // hello

// 실무패턴
// 조건부 실행(if대체) - 간결한 조건 실행
// isLogin && shwProfile(); === if(isLogin) {showProfile();}

// 기본값 설정(과거방식)
// const name = userName || "게스트"; 
//  -> userName이 falsy이면 "게스트"
// const age = userAge || 20; 단점
//  -> userName = 0면 -> 20으로 덮어씀❌

// 안전한 객체 접근
// user && user.profile && user.profile.name
//  -> user가 없으면 즉시 중단

// 함수 파라미터 보호
// function printName(person) {person && console.log(person.name);}

// 단락평가 vs 삼항 연산자
// isAdmin && deleteUser(); 단락평가
// isAdmin ? deleteUser() : showError(); 삼함연산자(else가 필요할때)

// 실수하기 쉬운예제
// ❌ 기대와 다른 동작
const count = 0;
const result1 = count || 10;
console.log(result1); // 10 (의도와 다를 수 있음)
// ✅ 해결 (Nullish Coalescing)
const result2 = count ?? 10; // null, undefined만 걸러냄

// 한문장으로 정리
// javascript는 단락 평가는 논리 연산 도중 결과가 확정되면
// 나머지 표현식을 실행하지 않고, 그 시점의 값을 반환하는 동작이다.

function returnFalse() {
  console.log("false 함수");
  return false;
}
function returnTrue() {
  console.log("true 함수");
  return true;
}
console.log(returnFalse() && returnTrue()); // false함수, false
console.log(returnTrue() && returnFalse()); // true 함수, false함수, false
// ||, &&는 boolean을 반환하지 않을 뿐 피연산자 평가 자체는 필요하면 실행
// 단란평가란 "필요 없으면 안실행"이지 "무조건 안실행"이 아니다.

console.log(returnFalse() || returnTrue()); // false함수, true함수, true
console.log(returnTrue() || returnFalse()); // true함수

// 단락 평가 활용
// 기존코드
function printNameYul(person) {
  if(!person) {
    console.log("person 값없음");
  }
}
// 개선된코드
function printNameYul2(person) {
  const name = person && person.name;
  console.log(name || "person에 값이 없습니다.");
}
printNameYul2();
printNameYul2({name: "soyul"});


