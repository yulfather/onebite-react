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
console.log(data); // {value: 100} -> 참조공유

// 4-2. 객체 안전하게 복사하는 방법(실무중요)

// ❌ 얕은 복사 위험
const user = {name: "soyul"};
const copy = user;
copy.name = "park"; // 원본변경 위험
console.log(user); // {name: 'park'}
console.log(copy); // {name: 'park'}

// ✅ 얕은 복사 (1단계) - {...user} 중괄호 + 스프레드 적용
const shallowCopy = {...user};
shallowCopy.name = "kim";
console.log(user); // {name: 'park'}
console.log(shallowCopy); // {name: 'kim'}

// 얕은 복사 예제
const user3 = {
  name: "soyul",
  address: {city: "paju"}
};

const shallowCopy2 = {...user3};

shallowCopy2.name = "kim";
shallowCopy2.address.city = "ansan";

console.log(user3.name); // "soyul" (원본유지)
console.log(user3.address.city); // "ansan" (원본변경)
// 왜 문제가 될까?
// address는 객체이기 때문에 얕은 복사는 address의 참조주소를 공유

// 언제 얕은 복사를 써도 되는가?
// 객체구조가 1단계, 중첩 객체가 없음, React state의 부분변경

// 4-3. 대표적인 깊은 복사 방법

// 4-3-1. JSON방식(가장쉬움)
// const deepCopy = JSON.parse(JSON.stringify(user));
//  -> 장점 : 간단, 대부분의 데이터 구조에서 충분
//  -> 단점 : 함수, Date, Map, Set, undefined, Symbol 사용안됨❌
//    -> 함수는 undefined처리

// 4-3-2. structuredClone(최신표준)
// const deepCopy = structuredClone(user);
//  -> 장점 : Date, Map, Set 지원, 가장안전
//  -> 단점 : 구형 브라우저 미지원

// 4-4. 깊은 복사 예제
const user4 = {
  name: "soyul",
  address: {city: "paju"}
};
const deepCopy = structuredClone(user4);
deepCopy.address.city = "ansan";

console.log(user4.address.city); // paju
console.log(deepCopy.address.city); // ansan

// 알아두어야 개념
// 함수는 데이터가 아니라 실행 로직이다
// 함수는 클로저를 포함한다.
// 함수는 자신이 선언된 렉시컬 환경을 할께 들고 있다.
// 이걸 깊은 복사하는다는 것은: 실행 컨텍스트, 스코프체인, 환경레코드 -> 전부복제?
//  -> JS엔진이 허용하지 않음
// 따라서 함수는 structuredClone()에 대상이 될 수 없다 

// 클래스 인스턴스
// 데이터만 복사됨
// 메서드, 타입정보 사라짐 따라서 효용성이 없음