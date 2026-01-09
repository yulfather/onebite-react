// 1. 대입 연산자 =
let var1 = 1;

// 2. 산술 연산자
// -> 운선순위 *, /, %
let num1 = 3 + 2;
let num2 = 3 - 2;
// 우선순위가 높다
let num3 = 3 * 2;
let num4 = 3 / 2;
let num5 = 3 % 2;

let num6 = 1 + 2 * 10;
console.log(num6); // 21

// 덧셈우선시
let num7 = (1 + 2) * 10;
console.log(num7); // 30

// 3. 복합 대입 연산자
let num8 = 10;
// num8 = num8 + 20; 코드가 길어짐
num8 += 20;
console.log(num8);
num8 -= 20;
num8 *= 20;
num8 /= 20;
num8 %= 20;
console.log(num8);

// 4. 증감 연산자 - ++, -- 1씩 증감
let num9 = 10;
// 증감연산자가 변수 뒤에오는 경우 num9++ 다음줄부터 실행
num9++;
console.log(num9); // 11
console.log(num9++); // 11 후위연산
console.log(num9); // 12

// 코드가 작성된 줄부터 값을 적용 시키려면 num9 += 1, ++num9 이런식으로 작성
console.log(num9 += 1); //13
console.log(++num9); // 14 전위연산

// 5. 논리 연산자 boolean
let or = true || false; // 둘중하나만 true면 true
let and = true && false; // 둘다 true여야 true
let not = !true; // 해당값에 반대를 부여
console.log(or, and, not); // true false false

// 6. 비교 연산자
// 두개의 값을 비교해서 boolean값을 반환

// == 두개 -> 값만비교 (타입 변환 발생) 느슨한 동등 비교
// 엔진이 “비슷하게” 만들어서 비교함
console.log(1 == "1"); // true
console.log(true == 1); // true
console.log(null == undefined); // true

// === 세개 -> 값 + 타입까지 비교 (타입 변환 없음) 엄격한 비교
// 타입이 다름 -> 즉시 false
console.log(1 === "1"); // false
console.log(true === 1); // false
console.log(null === undefined); // false

// ==의 유일한 실무 허용 사례 예외적 허용
// if(value == null) {
//   null과 undefined만 true로 보겠다
// }

// 실무에서는 무조건 === 사용

// 객체 비교 시 주의점
// {} == {} false
// {} === {} false

// 객체는 값이 아니라 참조(reference)를 비교
const a = {};
const b = a;
console.log(a === b); // true

let comp1 = 1 === 2;
let comp2 = 1 !== 2;
console.log(comp1, comp2); // false true

// 미만, 초과 >, < 연산자
let comp3 = 2 > 1;
let comp4 = 2 < 1;
console.log(comp3, comp4) // true false

// 이상, 이하 >=, <= 연산자
let comp5 = 2 >= 2;
let comp6 = 2 <= 2;
console.log(comp5, comp6); // true true





