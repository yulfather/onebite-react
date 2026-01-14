// 5가지 배열 변형 메서드

// 1. filter - 원본유지
// 기존 배열에서 조건을 만족하는 요소들만 필터링하여 "새로운 배열"로 반환

let arr1 = [
  { name: "soyul", hobby: "camping" },
  { name: "kyoungmin", hobby: "computer" },
  { name: "jihyundai", hobby: "camping" },
];

const campingPeple = arr1.filter((item) => item.hobby === "camping");
console.log(campingPeple);
//  { name: "soyul", hobby: "camping" }
//  { name: "jihyundai", hobby: "camping" }

console.log(arr1); // 원본유지
// { name: "soyul", hobby: "camping" },
// { name: "kyoungmin", hobby: "computer" },
// { name: "jihyundai", hobby: "camping" },

// filter를 함수로 직접구현
function myFilter(origin, callback) {
  let result = [];
  for (let i = 0; i < origin.length; i++) {
    let current = origin[i];
    if (callback(current)) {
      result.push(current);
    }
  }
  return result;
}
const campingPeple1 = myFilter(arr1, (item) => item.hobby === "computer");
console.log(campingPeple1);
// { name: "kyoungmin", hobby: "computer" }

// 2. map(배열요소, 인덱스, 원본배열) - 원본배열유지

// 프론트엔트 분야에서 자주사용되는 메서드
// 배열의 모든 요소를 순회, 각각 콜백함수를 실해하고 그 결과값들을 모아서 새로운 배열로 반환
let arr2 = [1, 2, 3];
arr2.map((item, idx, arr) => {
  // console.log(배열인덱스, 배열요소)
  console.log(idx, item); // 0 1, 1 2, 2 3
});

// 원본배열 유지
console.log(arr2); // [1, 2, 3]

// 새로운 배열 반환
const mapResult1 = arr2.map((item) => item * 2);
console.log(mapResult1); // [2, 4, 6]

// 객체의 프로퍼티를 가져와 새로운 배열 생성
let name1 = arr1.map((item) => item.name);
console.log(name1); // ['soyul', 'kyoungmin', 'jihyundai']

// map메서드 직접구현
function myMap(origin, callback) {
  let result = [];
  for (let i = 0; i < origin.length; i++) {
    let current = origin[i];
    result.push(callback(current));
  }
  return result;
}
const mapResult2 = myMap(arr2, (item) => item);
console.log(mapResult2); // [1, 2, 3]

// map메서드 직접구현 변형
const mapResult3 = myMap(arr2, (item) => item * 3);
console.log(mapResult3); // [3, 6, 9]

const name2 = myMap(arr1, (item) => item.hobby);
console.log(name2); // ['camping', 'computer', 'camping']

// 3. sort - 원본배열 변경
// 배열을 "사전순"으로 정렬하는 메서드
let arr3 = ["b", "c", "a"].sort();
console.log(arr3); // ['a', 'b', 'c']

let arr4 = ["c", "a", "b"];
arr4.sort();
console.log(arr4); // ['a', 'b', 'c']

// 주의할점
// sort메서드는 사전순으로 정렬되는 메서드이기 때문에 숫자의 대소비교가 필요함
let arr5 = [10, 4, 6];
arr5.sort();
console.log(arr5); // [10, 4, 6] 숫자크기에 대소가 맞지 않음

// 기본 sort는 문자열 비교 내부적으로 ("10" < "2") -> true 이렇게 동작
// 숫자를 sort할경우 콜백함수로 대소비교 로직을 추가해야됨

// 오름차순
// a > b 비교시 b가 작을경우 양수를 반환 1
// a < b 비교시 a가 작을경우 음수를 반환 -1
// 두값이 같을경우 0을 반환

// 내림차순
// a > b 비교시 b가 작을경우 양수를 반환 -1
// a < b 비교시 a가 작을경우 음수를 반환 1
// 두값이 같을경우 0을 반환

arr5.sort((a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
});
console.log(arr5); // [4, 6, 10]

// 개선된 코드
// 오름차순
let arr6 = [11, 3, 2, 6];
arr6.sort((a, b) => a - b);
console.log(arr6); // [2, 3, 6, 11]

// 내림차순
let arr7 = [11, 3, 2, 6];
arr7.sort((a, b) => b - a);
console.log(arr7); // [11, 6, 3, 2]

// 주의할점 sort는 원본배열을 변경
// -> 원본을 보호하려면?
const original = [11, 3, 2, 6];
// 스프레드활용
const sorted = [...original].sort((a, b) => a - b);
console.log("sorted : ", sorted); // sorted :  (4) [2, 3, 6, 11]

// 내부동작 for문으로 모델링
// 이 구조가 의미하는 것
// 항상 두 개씩 비교, 비교 결과에 따른 자리교환, 배열을 직접변경
function mySort(arr, compare) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (compare(arr[i], arr[j]) > 0) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
const mySorted = mySort([...original], (a, b) => a - b);
console.log("mySorted : ", mySorted); // mySorted :  (4) [2, 3, 6, 11]

// 정리요약
// sort는 내부적으로 boolean값에 따라 값이 결정되는게 아니라,
// 반환값인 양수,음수를 0과 비교해서 배열 인덱스 위치를 교체하는 것

// 4. toSorted - 원본배열유지 (가장 최근에 추가된 최신 함수)
// 정렬된 새로운 배열을 반환하는 메서드
let arr8 = ["c", "a", "b"];
const sorted1 = arr8.toSorted();
console.log(sorted1); // ['a', 'b', 'c']
console.log(arr8); // ['c', 'a', 'b'] - 원본배열유지

// 5. join - 원본유지
// 배열의 모든 요소를 하나의 문자열로 합쳐서 반환하는 메서드
let arr9 = ["hi", "im", "soyul"];
const joined = arr9.join(" "); // join() 인자로 구분자설정
console.log(joined); // hi im soyul
