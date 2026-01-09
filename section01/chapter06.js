// 1. 형 변환(Type Casting)
// - 어떤 값의 타입을 다른 타입으로 변경하는 것을 말함
// Number Type 10 ----------> String Type "10"

// 1. 묵시적 형 변환
// -> 자바스크립트 엔진이 알아서 형 변환
let num = 10;
let str = "20";
const result = num + str; // 묵시적으로 num에 할당된 값을 문자열로 인식
console.log(result); // 1020

// 2. 명시적 형 변환
// -> 프로그래머 내장함수를 이용해 직접 형 변환

// -> 문자열 ->  숫자
let str1 = "10";
let strToNum1 = Number(str1);
console.log(10 + strToNum1); // 20;

// -> 문자와 숫자가 섞여있는 경우
// -> "이거10개주세요" 문자열 중간에 숫자가 있는경우는 변환되지 못함
let str2 = "10개주세요";
let strToNum2 = parseInt(str2);
console.log(strToNum1 + strToNum2); // 20

// 숫자 -> 문자열
let num1 = 20;
let numTostr1 = String(num1);
console.log(numTostr1 + "입니다.");


