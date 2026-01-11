// Spread 연산자와 Rest매개변수

// 1. Spread연산자
// -> Spread: 흩뿌리다, 펼치다라는 뜻
// -> 객체나 배열에 저장된 여러개의 값을 개별로 흩뿌려주는 역할

// 배열
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = [...arr1, ...arr2, 7, 8, 9];
console.log(arr3); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 객체
let obj1 = {
  a: 1,
  b: 2,
};
let obj2 = {
  c: 3,
  d: 4,
};
let obj3 = {
  ...obj1,
  ...obj2,
  e: 5,
  f: 6,
};
console.log(obj3); // {a: 1, b: 2, c: 3, d: 4, e: 5, …}

// 함수
function funcA(p1, p2, p3) {
  console.log(p1, p2, p3); // 1 2 3
}
funcA(...arr1); 

// 2. Rest매개변수
// -> 나머지, 나머지매개변수
// 주의 - rest매개변수 뒤에는 추가적인 매개변수를 지정하지 못함
// -> funcB(one, ...rest, two) ❌안됨

// 배열 - 순서기준
function funcB(one, two, ...rest) {
  console.log(one, rest); // 1 [2, 3, 4, 5, 6, 7, 8, 9]
  console.log(one, two, rest); // 1 2 [3, 4, 5, 6, 7, 8, 9]
}
funcB(...arr3);

// 객체 - 중괄호 사용하여 {key값}으로 지정
function funcC({a, b, ...rest}) {
  console.log(a, rest); // 1 {c: 3, d: 4, e: 5, f: 6}
  console.log(a, b, rest); // 1 2 {c: 3, d: 4, e: 5, f: 6}
}
funcC({...obj3});