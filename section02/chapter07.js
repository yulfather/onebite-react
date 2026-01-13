// 배열 메서드 - 6가지의 요소조작 메서드

// 1. push - 원본배열 변경
// 배열의 맨 뒤에 새로운 요소를 추가하는 메서드
// 변환된 배열의 길이를 반환
let arr1 = [1, 2, 3];
const newLength = arr1.push(4, 5, 6);

console.log(arr1); // [1, 2, 3, 4, 5, 6] (변경된 원본배열)
console.log(newLength); // 6 (반환된 배열의 길이)

// 2. pop - 원본배열 변경
// 배열의 맨 뒤에 있는 요소를 제거 후 반환
let arr2 = [1, 2, 3];
const poppedItem = arr2.pop();

console.log(arr2); // [1, 2] (변경된 원본배열)
console.log(poppedItem); // 3 (반환된 마지막 배열의 값)

// shift & unshift -> push와 pop보다 느리게 동작
// -> 앞에 요소 추가, 삭제에 따른 전체요소의 index 재구성
// -> push와 pop은 뒤쪽 배열 추가,삭제로 변경부분에 대한 index만 추가됨

// 3. shift - 원본배열 변경
// 배열의 맨 앞에 있는 요소를 제거, 반환
let arr3 = [1, 2, 3];
const shiftedIdtem = arr3.shift();
console.log(shiftedIdtem, arr3); // 1 [2, 3]

// 4. unshift - 원본배열 변경
// 배열의 맨 앞에 새로운 요소를 추가하는 메서드
// 변경된 배열의 길이를 반환
let arr4 = [1, 2, 3];
const newLength2 = arr4.unshift(0);
console.log(newLength2, arr4); // 4 [0, 1, 2, 3]

// 5. slice(시작index, 마지막index이전) - 원본불변
// 배열의 특정 범위를 잘라내서 새로운 배열로 반환
let arr5 = [1, 2, 3, 4, 5];

const sliced = arr5.slice(2, 5);
console.log(sliced); // (3) [3, 4, 5]

// 시작index부터 끝까지 자를경우 -> 메서드에 두번째 인수 생략가능
const sliced1 = arr5.slice(2);
console.log(sliced1); // (3) [3, 4, 5]

// 뒤에서 부터 자르고 싶다면? -붙여서 뒤부터 계산
const sliced2 = arr5.slice(-3);
console.log(sliced2); // (3) [3, 4, 5]

// 원본배열
console.log(arr5); // (5) [1, 2, 3, 4, 5]

// 6. concat - 원본불변
// 두개의 서로 다른 배열을 이어 붙여서 새로운 배열을 반환
let arr6 = [1, 2];
let arr7 = [3, 4];

let concatedArr = arr6.concat(arr7);
console.log(concatedArr); // (4) [1, 2, 3, 4]
