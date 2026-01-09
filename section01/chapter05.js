// javaScript의 자료형(Data Type)
// 자료형 - 원시타입 - Number
//                 - String
//                 - Boolean
//                 - Null
//                 -Undefind
//       - 객체타입 - Object - Array
//                          - Function
//                          - RegexExp

// 1. Number Type
let num1 = 24;
let num2 = 1.5;
let num3 = -20;

// 연산자
console.log(num1 + num2);
console.log(num1 - num2);
console.log(num1 * num2);
console.log(num1 / num2);
// 모듈러 연산자 - 나머지 구하기
console.log(num1 % num2);

let inf = Infinity;
let mInf = -Infinity;
// 수치 연산이 실패했을때 결과값
let nan = NaN;
console.log(1 * "park"); // NaN

// 2. String Type
// 할당할 값은 따옴표로 감싸야함 그렇지 않으면 변수로 인식
let firstName = "park";
// 문자열도 덧셈연산가능
let lastName = " kyoung min";
let myName = firstName + lastName;
console.log(myName); // park kyoung min

// 템플릿 리터럴 문법
// ``백틱 사용가능
// ${변수}를 활용해 변수나 함수를 동적으로 입력할 수 있다
console.log(`my name is ${myName}`); // my name is park kyoung min

// 3. Boolean Type
// 상태를 표시하는데 활용
let isSwitchOn = true;
let isEmpty = false;

// 4. Null Type(아무것도 없다)
// null라는 값은 어떤 변수에 어떠한 값도 들어있지 않다
// null = 의도적으로 비워 둔 상태
// 아직 값이 없거나, 더 이상 사용하지 않는 값을 의도적으로 초기화할 때 사용
let empty = null;
let user = null; // 개발자가 "아직 사용자 없음"을 명시
// 변수는 존재 값은 비어 있음(null)

// undefined vs null 비교
let a;
console.log(a); // undefined

let b = null;
console.log(b); // null

// 구분    null            undefined
// 의미    의도적비움        아직 정의되지 않음
// 설정    개발자           js엔진
// 초기화  의도적초기화됨     초기화안됨
// 타입    primitive       primitive

// 5. Undefind Type
// undefined라는 단 하나의 값만 존재 초기화가 안된상태
let none;
console.log(none); // undfined

// 한눈에 비교
// 구분	     undefined	null
// 선언됨	   ✅	       ✅
// 값 할당	 ❌	       ✅
// 초기화	   ❌	       ✅
// 의미	     아직 없음	  비워둠
// 누가설정	  JS엔진	    개발자

// 비교연산 시 주의
// 느슨한 비교
console.log(null == undefined); // true
// 엄격한 비교
console.log(null === undefined); // false



