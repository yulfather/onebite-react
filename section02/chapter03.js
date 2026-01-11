// 구조분해할당
// 배열이나 객체에 들어 있는 값을 "분해"하여 변수에 한 번에 할당하는 문법

// 1. 배열

const colors = ["red", "green", "blue"];

// 1-1. 기존방식 - 값에 "접근"해서 하나씩 꺼냄
const first = colors[0];
const second = colors[1];

// 1-2. 구조분해할당 방식 - 형태(구조)를 기준으로 한 번에 꺼내는 방식
const [one, two, three] = colors;
console.log(one); // red
console.log(two); // green
console.log(three); // blue

// 핵심규칙
//  - 배열은 "순서(index)"기준
//  - 왼쪽 변수의 위치 ↔ 오른쪽 배열의 위치가 대응됨

// 1-3. 일부값만 가져오기
const [a, , c] = ["red", "green", "blue"];
console.log(a); // red
console.log(c); // blue

// 1-4. 기본값 지정
const [x = 10, y = 20] = [5, 15];
console.log(x); // 5
console.log(y); // 15

// 1-5. 나머지 요소 받기
const [첫째, ...나머지] = ["red", "green", "blue"];
console.log(첫째); // red
console.log(나머지); // ['green', 'blue']

// 2. 객체

const user = {name: "soyul",age: 7};

// 2-1. 기존방식
const name1 = user.name;
const age1 = user.age;
console.log(name1); // soyul
console.log(age1); // 7

// 2-2. 구조분해할당 방식
const {name2, age2} = user;
console.log(name2); // soyul
console.log(age2); // 7

// 핵심규칙
//  - 객체는 "키(key) 이름"기준 순서는 중요하지 않음

// 2-3. 변수이름변경
const {name2: userName} = user;
console.log(userName); // soyul

// 2-4. 기본값 지정
const {firstName = "park"} = user;
console.log(firstName) // park

// 2-5. 중첩객체 구조분해
const user1 = {
  name: "soyul",
  address: {
    city: "paju",
    zip: 1234
  }
};
const {address} = user1;
const {address: {city}} = user1;
console.log(address); // {city: 'paju', zip: 1234}
console.log(city); // paju

// 3. 함수와 구조분해할당(실무핵심)
//  - 함수 매개변수에서 구조분해
function printUser({name, age}) {
  console.log(name, age);
}
printUser({name: "soyul", age: 7}); // soyul 7

// 4. 배열 반환값 구조분해
function getPosition() {
  return [10, 20];
}
const [x1, y1] = getPosition();
console.log(x1); // 10
console.log(y1); // 20

// React에서 자주 보는 구조분해
//  - props구조분해
// function Card({title, children}) {
//   return (
//     <div>
//       <h2>{title}</h2>
//         {children}
//     </div>
//   )
// }

// 5. useState구조분해
// const [count, setCount] = useState(0);
// -count -> 상태값
// -setCount -> 상태변경함수

const func = ({name, age, hobby}) => {
  console.log(name, age, hobby);
}
func({name: "park", age: 7, hobby: "cooking"}); // park 7 cooking
