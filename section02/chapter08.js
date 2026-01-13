// 배열 메서드 - 순회와 탐색(Iteration & Search)
// 5가지 요소 순회 및 탐색 메서드

// 1. forEach
// 모든 요소를 순회하면서, 각각의 요소에 특정 동작을 수행시키는 메서드

// 동작원리
// - 각 요소를 대해 콜백실행
// - 반환값: 항상 undefined
// - 중간에 break가 불가능(일반적으로)

// 내부구조
// 인덱스 0부터 length-1까지 순서대로 콜백 호출

// 핵심특징
// - 배열전용 메서드
// - 요소 개수만큼 반복 실행
// - 반환값(return)이 없다(undefined)
// - 반복 자체가 목적일 때 사용

// 기본 문법
// 배열.forEach(function(요소, 인덱스, 원본배열) {
//   실행코드
// })
let arr1 = [1, 2, 3];
arr1.forEach(function (item, i, arr) {
  console.log(i, item * 2); // 0 2, 1 4, 2 6
});

// arr1에 값을 *2 처리 후 doubledArr배열에 담기
let doubledArr = [];
arr1.forEach((item) => {
  doubledArr.push(item * 2);
});
console.log(doubledArr);

// 2. includes
// 배열에 특정 요소가 있는지 확인하여 boolean값을 반환하는 메서드
let arr2 = [1, 2, 3];
let isInclude = arr2.includes(3);
console.log(isInclude); // true

// 3. indexof(찾는요소) -> 반환: 인덱스
// 특정 요소의 인덱스를 찾아서 반환하는 메서드
let arr3 = [1, 2, 3];
let index1 = arr3.indexOf(3);
console.log(index1); // 2 -> 인덱스위치를 반환

// 동일한 요소의 값이 여러개있는 경우
let arr4 = [2, 2, 4];
let index2 = arr4.indexOf(2);
console.log(index2); // 0 제일 앞에 값이 반환됨

// 존재하지 않는 값을 찾을경우 -1이 반환됨
let index3 = arr4.indexOf(200);
console.log(index3); // -1

// 4. findIndex
// 모든 요소를 순회
// 콜백함수를 만족하는 특정 요소의 인덱스(위치)를 반환하는 메서드
// 조건을 만족하는 첫 인덱스 반환, 없으면 -1
let arr5 = [1, 2, 3];
const findedIndex1 = arr5.findIndex((item) => {
  if (item === 2) return true; // 콜백함수를 만족하는 조건
});
console.log(findedIndex1); // 1 조건에 만족하는 인덱스값 반환

// 배열에 요소가 홀수인 값을 만족하는 조건
// 탐색에 해당하는 첫 배열요소 인덱스값이 반환됨
const findedIndex2 = arr5.findIndex((item) => item % 2 !== 0);
console.log(findedIndex2); // 0 -> 조건을 만족하는 배열의 첫번재 인덱스

// indexof vs findIndex
// findIndex를 사용하는 이유
// indexof는 원시타입 배열요소인 경우 적합
// 배열의 요소가 객체타입인 경우 인수로 객체를 전달하여 인덱스 위치를 찾을때
// 인덱스 위치 탐색을 하지 못함

// indexof - === 얕은비교로 동작
let objectArr = [{ name: "soyul" }, { name: "park" }];
console.log(objectArr.indexOf({ name: "soyul" })); // -1

// findIndex - 콜백함수를 이용해서 프로퍼티의 값을 기준을 비교함
console.log(objectArr.findIndex((item) => item.name === "soyul")); // 0

// 5. find
// 모든 요소를 순회하면서 콜백함수를 만족하는 요소를 찾는데, 요소를 그대로 반환
const finded = objectArr.find((item) => item.name === "park");
console.log(finded); // {name: 'park'}
