// callback함수

// ()소괄호를 안붙이는 이유
// main2(sub); sub <- 함수 자체
// sub: 함수 값(참조) 참조만하고 실행되지 않음
// main2 내부에서 value()로 실행

// 실행흐름
// 1) main2(sub) 호출
// 2) main2()매개변수인 value로 sub함수가 인자로 전달
// 3) value()실행 -> sub()실행
// 4) "i am sub" 출력

// main2(sub())로 호출하면 벌어지는 일 -> 실행순서가 달라짐
// sub() 즉시 실행 -> console.log("i am sub");
// 콘솔출력 : "i am sub"
// 반환값 : sub()에 return값이 없으므로 undefined

// 메모리 / 실행 컨텍스트 관점
// main2(sub)
// - sub의 주소(reference) 를 전달
// - 실행 컨텍스트는 아직 생성 안 됨
// - value() 호출 시점에 실행 컨텍스트 생성
// main2(sub())
// - sub() 실행 -> 실행 컨텍스트 즉시 생성
// - return값 평가 후 전달 -> undefined
// - 함수가 아닌 값이 넘어감 -> console.log("i am sub"), undefined

// 한 문장으로 정리
// 소괄호가 없으면 "함수 자체를 전달"
// 소괄호가 있으면 "함수를 즉시 실행한 결과를 전달"

// 기본적인 함수
function main1(value) {
  console.log(value);
}
main1(1);

// callback함수 구현
function main2(value) {
  console.log("i am main2");
  value(); // 실행 시점을 조정할 수 있음
  console.log("i am end");
}
function sub() {
  console.log("i am sub1");
}
main2(sub);
main2(() => console.log("i am sub2"));

// callback 미사용 비슷한 코드가 많아져 관리하기 힘들어진다.
function repeat(count) {
  for(let i = 0; i <= count; i++) {
    console.log(i);
  }
}
function repeatDouble(count) {
  for(let i = 0; i <= count; i++) {
    console.log(i * 2);
  }
}
repeat(3);
repeatDouble(5);

// callback함수 활용
// 비슷한 코드가 줄고 깔끔하게 유지
function repeatCallback(count, callback) {
  for(let i = 0; i <= count; i++) {
    callback(i);
  }
}
repeatCallback(3, function(i) {console.log(i);})
repeatCallback(4, (i) => console.log(i));
repeatCallback(5, i => console.log(i));
