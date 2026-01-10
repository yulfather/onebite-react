// 1. 화살표 함수

// 1-1. 기본구조
const 함수명 = (매개변수) => {
  실행문;
  return 반환값
}

// 1-2. 매개변수가 하나인 경우(괄호 생략 가능)
const square1 = x => {return x * x;}

// 1-3. 실행문이 한 줄이고 return만 있을때
//  -> {}중괄호와 return생략가능
const square2 = x => x * x;

// 1-4. {}중괄호를 사용하면 return을 붙여한다.
//  -> 화살표 함수에서 {}를 쓰는 순간 함수본문은 블록으로 인식
const add1 = (a, b) => {return a + b;} // 계산해서 반환
const add2 = (a, b) => {a + b;} // 계산만하고 반환은 안됨

// 1-5. {}를 생략 시 자동으로 return된 -> Implicit return
const add3 = (a, b) => a + b;

// 1-6. 객체를 반환할 때 주의
// ❌ 오류
const getUser1 = () => { name: "철수" };

// ✅ 정상
const getUser2 = () => ({ name: "철수" });

// javascript엔진의 해석 방식
//  화살표 함수에서 {}가 나요면 블록으로 해석
// {} -> 코드블록
// name: -> 객체가 아니라 라벨 문(statement label)
// 반환값 없음 -> undefined

// ({}) 감싸는 이유
// () -> "이건 표현식이야" JS엔진에 명시
// {} -> 블록이 아니라 객체 리터럴
() => ({name: "soyul"}); // -> 객체를 표현식으로 평가해서 반환


// -정리-
// {} = 실행블록
// 블록 내부에서 값을 반환하려면 반드시 return필요
// {}를 사용하면 블록이 되어서 return이 필요
// 객체 반환하려면 {}가 블록이 아니라는 걸 알려주기 위해 ()소괄호 사용

// 실무감각 정리
//  - 한 줄 반환 -> 중괄호 없이
//  - 여러줄로직 -> 중괄 +  return
//  - 객체 바로 반환 -> ({}) 형태로 습관화

function funcA() {
  console.log("funcA");
}
// 함수를 함수명만 ()실행 중괄호 없이
// 변수에 담아 콘솔 출력하면 함수에 출력값이 나오지 않고 함수 자체가 출력됨
let varA = funcA;
console.log(varA); // ƒ funcA() {console.log("funcA");}
varA(); // 함수를 담은 변수를 ()붙여 호출할 수 있다.

// 함수의 값을 생성하여 바로 변수에 할당할 경우 익명 함수로 사용가능
let varB = function() {console.log("varB");}
varB();

// 2. 화살표 함수
let varC = () => {return 1;} // function키워드 생략
varC = () => 1; // {}중괄호 생략 return 생략
varC = a => a + 1; // 매개변수 하나일경우 ()소괄호 생략
varC = (a, b) => a + b;


