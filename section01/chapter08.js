// 1. null 병합 연산자
// -> 존재하는 값을 추려내는 기능
// -> null, undefined가 아닌값을 찾아내는 연산자
let var1;
let var2 = 10;
let var3 = 20;
let var4 = null;

const vars = [var1, var2, var3, var4];
const validVars = vars.filter(v => v != null);
const notValidVars = vars.filter(v => v == null);

console.log(validVars); // [10, 20]
console.log(notValidVars); // [undefined, null]

// -> 왼쪽값이 null 또는 undefined일 때만 오른쪽 값을 사용한다.
// userName에 값이 null이나 undefined값이라면 userNicName 값을 넣라
let = userName = "soyul";
let = userNicName = 'parkpark';
let = displayName = userName ?? userNicName;
console.log(displayName);

// 왼쪽값이 null or undefined인 경우 오른쪽값사용
let a = null ?? "A";
let b = undefined ?? "A";

// 인쪽값이 null or undefined이 아닌 경우 왼쪽값사용
let c = 0 ?? "A";
let d = "B" ?? "A";
let e = false ?? "A";

console.log("R: " + a, b + " / L: " + c, d, e); // R: A A / L: 0 B false

// 2. typeof 연산자
// -> 값의 타입을 문자열로 반환하는 기능을 하는 연산자
let var7 = 1;
var7 = "soyul";

let t1 = typeof var7;
console.log(t1); // string

// 3. 삼항 연산자
// -> 항을 3개 사용하는 연산자
// -> 조건식을 이용해서 참, 거짓 반환
let var8 = 10;

// 요구사항 : 변수 res에 var8에 값이 "짝수", "홀수" 반환되는 코드
// 조건식 ? true일 때 반환값 : false일 때 반환값
let res = var8 % 2 === 0 ? "짝수" : "홀수";
console.log(res); // 짝수

