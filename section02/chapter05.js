// 원시타입(Primitive Type) vs 객체타입(Objct Type)

// 1. 원시타입(Primitive Type)
// -> 원시타입은 "더 이상 쪼갤 수 없는 단일 값"을 의미
// 타입	         예시
// number	      1, 3.14
// string	      "hello"
// boolean	    true, false
// undefined	  undefined
// null	        null
// symbol	      Symbol('id')
// bigint	      10n

// 1-2. 핵심원리(값 자체를 저장)
//  -> 원시 타입은 값(value) 그 자체가 변수에 저장됨
let a = 10;
let b = a;
b = 20
console.log(a); // 10
console.log(b); // 20
// 왜 이런 결과가 나올까?
//  - a에는 10이라는 값 자체가 저장됨
//  - b = a → 값 복사
//  - 서로 완전히 독립적인 값

// 1-3. 메모리 구조 개념
// let a = 10 --- a → 10
// let b = a  --- b → 10 (복사)
// 이후 b = 20;
// a → 10
// b → 20

// 1-4. 특징요약
//  - 값 자체 저장, 불변성(immutable)
//   → 값이 바뀌는 것이 아니라 새 값으로 교체
//  - 비교 시 값 비교
// 10 === 10 true

// 2. 객체 타입(Object Type)
// 2-1. 개념정의
//  -> 객체타입은 "여러 값을 하나로 묶은 구조"
//  -> ""메모리 주소(reference)""를 저장
// 객체 타입에 포함되는 것들:
// Object {}
// Array []
// Function function(){}
// Date, Map, Set 등

// 2-2. 핵심원리(참조값 저장)
// -> 객체는 주소(reference)를 저장
const user1 = {name: "soyul"};
const user2 = user1;
user2.name = "park";
console.log(user1.name); // park
// 왜 user1도 바뀔까?
//  - user1과 user2는 같은 객체 주소를 참조
//  - 하나를 수정하면 같은 메모리 공간이 변경됨

// 2-3. 메모리 구조 개념
// user1 ──┐
//         ├──► { name: "soyul" }
// user2 ──┘

//                             user1 ──┐
//                                     ├──► { name: "park" }
// user2.name = "park" 실행 ─► user2 ──┘

// 2-4. 특징요약
// - 주소(reference)저장, 가변성(mutable), 비교 시 주소 비교 {} === {} false

// 3. 원시 vs 객체 핵심 차이 정리
// 구분   	  원시타입	         객체타입
// 저장방식	   값자체	            참조주소
// 복사	      값복사	           주소복사
// 불변성	    불변	             가변
// 비교	      값비교	           주소비교
// 예시	      number, string	  object, array

// 4. 실무에서 반드시 이해해야 할 포인트
// 4-1. 함수 파라미터 전달 차이

// 원시타입
function change(x) {
  x = 100;
}
let a1 = 10;
change(a1);
console.log(a1); // 10 -> 값복사

// 객체타입
function change1(obj) {
  obj.value = 100;
}
const data = {value: 10};
change1(data);
console.log(data); // 100 -> 참조공유