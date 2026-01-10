// 1. 배열 Array
// 생성
let arrA = new Array(); // 배열 생성자
let arrB = []; // 배열 리터럴(대부분 이방식)

let arrC = [
  1, 2, 3, // 숫자
  true, // boolean
  "hello", // 문자열
  null, undefined, // 널, 언디파인
  () => {}, // 함수
  {}, [], // 객체, 배열
];

// 2. 배열의 원소들에 접근하는 방법
let item1 = arrC[0];
let item2 = arrC[1];
console.log(item1, item2);
arrC[0] = "hello";
console.log(arrC); // ['hello', 2, 3, true, 'hello', null, undefined, ƒ, {…}, Array(0)]