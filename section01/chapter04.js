// 1. 변수
// let 선언 / age = 27; 초기화
// 재선언 불가
let age;
console.log(age); // undefined
age = 30;
console.log(age); // 30

// 2. 상수 const
// 초기화 반드시 필요 -> 상수는 선언 후에 초기가 불가능하기 때문
// 할당된 값은 변경이 불가
const birth = "1982.08.06";
console.log(birth);

// 3. 변수 명명규칙(네이밍 규칙)
// 3-1. $, _ 제외한 기호는 사용 불가
// let name#, #name안됨
let $_name; // 가능

// 3-2숫자가 변수명 앞에오면 안된다
// let 1name; 불가능
let name1; // 가능
let na1me; // 가능
let _1name; // 가능
let $1name; // 가능

// 3-3. 예약어 사용 불가
// let let, let if 불가

// 4. 변수 명명 가이드
// 변수명이 어떤의미가 있는지 알지못함
let a = 1;
let b = 1;
let c = a - b; 

// 누가봐도 이해할 수 있는 변수명으로
// camelCase 방법사용
let salesCount = 1;
let refundCount = 2;
let totalSalesCount = salesCount + refundCount;
