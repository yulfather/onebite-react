// 반복문으로 배열과 객체 순회하기
// 순회(iteration)란?
//  -> 배열, 객체에 저장된 여러개의 값에 순서대로 하나씩 접근하는 것을 말함

// 1. 배열 순회
let arr = [1, 2, 3];

// 1-1. 배열 인덱스 - 배열에 프로퍼티 .length사용
for(let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

let arr2 = [4, 5, 6, 7, 8];
for(let i = 0; i < arr2.length; i++) {
  console.log(arr2[i]);
}

// 1-2. for of 반복문 - 배열을 순회하기 위한 반복문
for(let item of arr) {
  console.log(item);
}

// 2. 객체순회
let person = {
  name: "soyul",
  age: 7,
  hobby: "camping"
}

// 2-1. Object.keys 사용
//  -> 객체에서 key 값들만 뽑아서 새로운 배열로 반환
let keys = Object.keys(person);
console.log(keys); // ['name', 'age', 'hobby']

// key값만 반복
for(let i = 0; i < keys.length; i++) {
  console.log(keys[i]);
}
for(let key of keys) {
  console.log(key);
}

// key값 + value반복
for(let i = 0; i < keys.length; i++) {
  console.log(keys[i], person[keys[i]]);
}
for(let key of keys) {
  console.log(key, person[key]);
}

// key값 + value반복 + 깔끔버전
for(let key of keys) {
  const value = person[key];
  console.log(key, value);
}

// 2-2. Object.values 사용 
//  -> 객체의 value값만 뽑아서 새로운 배열로 반환
let values = Object.values(person);
console.log(values); // ['soyul', 7, 'camping']

for(let value of values) {
  console.log(value);
}

// 2-3. for in(객체만사용) -> 객체의 key값만 뽑아서 반복실행
for(let key in person) {
  const value = person[key];
  console.log(key, value);
}