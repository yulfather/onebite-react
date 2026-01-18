// Props로 데이터 전달하기

// 1. props란?
// "props(properies)"는 부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달하기 위한 객체
//  - 컴포넌트는 함수
//  - props는 함수의 매개변수
//  - JSX에서 속성처럼 전달됨

// 핵심
// props는 읽기 전용(immutable)
// 작 컴포넌트에서 직접 수정 불가

// props에 기본값을 설정할때에는 구조분해문법을 사용해 기본값 설정 방식을 사용
const Button = ({ children, text, color = "black" }) => {
  return (
    <>
      <button style={{ color: color }}>
        {text} - {color}
        {children}
      </button>
    </>
  );
};

export default Button;
