import "./Main.css";

// JSX 사용시 주의 사항
// 1. 중괄호 내부에는 자바스크립트 "표현식"만 넣을 수 있다.
// -> 특정한 값으로 평가는 number, string, 삼항연산자
// -> if, for문은 사용할 수 없음
// -> 객체 자체는 렌던링될 수 없고 obj.name 형식으로 값을 불러와야됨

// 2. 숫자, 문자열, 배열 값만 렌더링 된다.
// -> true, null, undefined 렌더링 안됨

// 3. 모든 태그는 </> 닫혀있어야 한다.

// 4. 최상위 태그는 반드시 하나여야만 한다.<main></main>
//  -> <></> 빈태그 사용도 가능

// 5. return 뒤에 HTML 코드가 와야된다.

// 6. style속성 추가시 규칙
//  1) 속성명은 camelCase로 작성
//   - font-size -> fontSize
//   - background-color -> backgoundColor
//  2) JSX에서 이미 {}를 JavaScript 표현식을 위한 중괄호로 사용
//   -> 스타일 객체를 넣을때도 {} 중괄호 사용
//   -> 따라서 {{...}} 중괄호를 두번사용해야됨
//   -> Main전용 css파일을 만들 css속성코드 관리
//   -> import "./파일명.확장자"
//  3) JSX에서 class 적용시 -> className으로 설정

const Main1 = () => {
  const user = {
    name: "soyul",
    isLogin: true,
  };
  if (user.isLogin) {
    return <div className="logout">로그아웃</div>;
  } else {
    return <div>로그인</div>;
  }
  // return <>{user.isLogin ? <div>로그아웃</div> : <div>로그인</div>}</>;
};

const Main = () => {
  // 변수를 만들어 화면에 렌더링하기
  // 변수를 리턴하는 HTML코드에서 사용시 {변수}중괄호 안에 입력
  const number = 9;
  const obj = { name: "soyul", age: 7 };

  return (
    <main>
      <h1>main</h1>
      <h2>{number % 2 === 0 ? "짝수" : "홀수"}</h2>
      <h2>{`내이름은 ${obj.name}야 나이는${obj.age}살이야`}</h2>
      <Main1 />
    </main>
  );
};

export default Main;
