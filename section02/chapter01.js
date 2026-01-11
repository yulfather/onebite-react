// truthy & falsy

// 1. Falsy: false는 아니지만, 조건문에서 false처럼 평가되는 값
// false
// 0
// -0
// "" 빈 문자열
// null
// undefined
// NaN
// 0n 빅integer
let f1 = undefined;
let f2 = null;
let f3 = 0;
let f4 = -0;
let f5 = NaN;
let f6 = "";
let f7 = 0n;
if(!f1) {
  console.log("falsy");
}

// 2. Truthy: true는 아니지만, 조건문에서 true처럼 평가되는 값(대부분의 값)
// true
// 1
// -1
// "0"
// "false"
// []
// {}
// function () {}
// () => {};
if([]) { // 빈배열이 입력되어도 true로 판정
  console.log("truthy");
}

// 3. 활용사례
function printName(person) { 
  if(person === undefined || person === null) {
    // person에 값이 null or undefined일경우 실행
    console.log("person에 값이 없습니다.")
    return;
  }
  console.log(person.name);
}
let person = null;
printName(person);
// printName(null) 호출
// if (person === undefined || person === null) → true
// "person에 값이 없습니다." 출력
// return 실행
// 함수 즉시 종료
// 아래 코드인 console.log(person.name)는 실행되지 않음

// 개선된 코드
function printName2(person) {
  if(!person) {
    console.log("person에 값이 없습니다.");
    return;
  }
  console.log(person.name);
}
let person2 = {name: "soyul"};
printName2(person2)



// return의 역할
// 1. 함수 실행을 즉시 중단
// 2. 호출한 곳으로 제어를 되돌림 (값이 있으면 반환)
//  -> return이 어떤 블록(if, for, while) 안에 있든 상관없이,
//     그블록을 감싸고 있는 함수 자체를 종료합니다.

// 왜 if만 탈출하지 않을까
//  -> if는 제어문(조건분기) 일뿐
//     return은 함수 제어 키워드

// break - 반복문(for, while) - 반복문전용
// return - 함수 전체 종료 - 함수전용
// if - 조건에 따라 코드 실행
// continue - 반복문의 다음 반복으로 이동