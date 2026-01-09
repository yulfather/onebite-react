// 1. if 조건문
let num = 9;
if(num >= 10) {
  console.log("num은 10 이상");
} else if(num >= 5) {
  console.log("num은 5 이상");
} else {
  console.log("거짓입니다.")
}

// 2. Switch문
// -> if문과 기능이 동일
// -> "다수의 조건"을 처리할때 if보다 직관적

// -> 조건에 변수가 입력되고
// -> 변수조건에 일치하는 행부터 순차적 실행됨
// -> 변수조건에 실행 완료 아래단계 실행이 멈추고 싶다면 break;문 사용
// -> 코드실행 단계에서 break를 만나면 전역부터 실행됨
let animal = "cat";
switch(animal) {
  case "cat": {
    console.log("야옹");
    break;
  }
  case "dog": {
    console.log("멍");
    break;
  }
  case "bear": {
    console.log("쿠우");
    break;
  }
  case "snake": {
    console.log("쉬리릭");
    break;
  }
  case "tiger": {
    console.log("어흥");
    break;
  }
  // 조건에 만족하는 변수가 아닐 시 default실행
  default: {
    console.log("그런 동물은 없습니다.");
  }
}