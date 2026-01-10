// 1. 상수 객체
const animal = {
  type: "고양이",
  name: "나비",
  color: "black",
};

animal.age = 2; // 추가
animal.name = "cheeseCat"; // 수정
delete animal.color; // 삭제
console.log(animal); // {type: '고양이', name: 'cheeseCat', age: 2}

// 고정 된 것 : 객체의 참조(주소값)
// animal = {type: "야옹이"} 변경불가

// 고정되지 않는 것: 객체 내부의 값
// 참조만 불변 -> 내부 상태는 가변
animal.type = "tiger"; // 가능

// 요약
// 상수객체란 const로 선언되어 재할당은 불가능, 내부 프로퍼티 변경은 가능

// 2. 메서드
// -> 값이 함수인 프로퍼티를 말함
// -> 함수가 아닌 프로퍼티는 객체의 정보를 나타냄
// -> 함수 프로퍼티님 메서드로서 객체의 동작을 담당함
const person = {
  name: "soyul",
  sayHi1: function() {console.log("하이");},

  // 화살표 함수 일반적인 메서드로 권장❌ this를 자신의 객체로 바인딩하지 않음
  sayHi2: () => console.log("안녕"),

  // 메서드 선언 -> 객체에 소속됨
  sayHi() {console.log("빠염");}
}

// 호출
person.sayHi1();
person["sayHi"]();