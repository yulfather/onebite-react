// 1. 객체(Object)

// 1-1. 객체생성
let obj1 = new Object(); // 객체 생성자
let obj2 = {} // 객체 리터럴 : {}중괄호 안에 key, value형식으로

let family = {
  // 1-2. 객체 프로퍼티(객체속성) : 객체의 실질적인 정보
  //  key : valye, 형식으로 작성
  name: "soyul",
  nickname: "parkparkfriend",
  age: 7,
  location: "paju",
  job: "kindergartner",
  "like rabbit": true, // key값에 띄어쓰기 사용 시 쌍따옴표로 감싸야한다.
}

// 2. 객체 프로퍼티를 다루는 방법
// 2-1. 특정 프로퍼티에 접근(점 표기법, 괄호 표기법)
let name = family.name; // 점 표기법
let age = family["age"]; // 괄호[대괄호] 표기법, 쌍따옴표로 감쌓아야한다.
console.log(name, age); 

let property = "location";
let juso = family[property];
console.log(juso); // paju

// 3. 새로운 프로퍼티 추가 방법
family.job = "fe kindergartner"; // 기존 value값 변경
family["favoriteFood"] = "noodle"; // 새로운 key: value값 추가
console.log(family.job);
console.log(family.favoriteFood);
console.log(family);
// age: 7
// favoriteFood: "noodle"
// job: "fe kindergartner"
// "like rabbit": true
// location: "paju"
// name: "soyul"
// nickname: "parkparkfriend"

// 3-1 프로퍼티 삭제
delete family.favoriteFood;
delete family["job"];
console.log(family); 
// age: 7
// "like rabbit": true
// location: "paju"
// name: "soyul"
// nickname: "parkparkfriend"

// 3-1 프로퍼티의 존재 유무확인(in 연산자) true false로 반환
let result1 = "name" in family; // name이라는 key가 family에 있냐?
console.log(result1); // true