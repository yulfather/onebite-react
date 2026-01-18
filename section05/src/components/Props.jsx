// Props로 데이터 전달하기

// 1. props란?
// "props(properies)"는 부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달하기 위한 객체
//  - 컴포넌트는 함수
//  - props는 함수의 매개변수
//  - JSX에서 속성처럼 전달됨

// 핵심
// props는 읽기 전용(immutable)
// 자식 컴포넌트에서 직접 수정 불가
// 데이터 흐름은 부모 -> 자식(단방향)

// 2. props 기본 구조

// 2-1. 문자열 전달 JSX속성 -> props객체의 key
function Child1(props) {
  console.log(props);
  return <h2>{`안녕 ${props.name}이야 사는곳은 ${props.address}야`}</h2>;
}

// 2-2. 숫자/변수/표현식 전달 - {}안에는 Javascript표현식
const Child2 = (props) => {
  return <p>{`나이는 ${props.age}살이야`}</p>;
};

// 2-3. 여러 props 전달 - 기존방식
const Child3 = (props) => {
  return (
    <>
      <p>{`좋아하는 음식은 ${props.food} 이야`}</p>
      <p>{`좋아하는 놀이는 ${props.play} 이거야`}</p>
    </>
  );
};

// 3. 여러 props 전달 - 구조 분해 방식(실무 표준)
// - 사용이유
// -> 가독성 향상, props 반복 접근 제거, 실무에서 거의 필수
const Child4 = ({ name, age }) => {
  return (
    <>
      <p>{`난 ${name}이라고 해`}</p>
      <p>{`나이는 ${age}살이야`}</p>
    </>
  );
};

// 4. props 전달 동작 원리(중요)
// <Child name="soyul" age={7} /> -> 부모컴포넌트가 값전달
// Child({name: "soyul", age: 7}) -> React내부 동작 개념적
// -> JSX는 컴포넌트 함수 호출 -> props는 하나의 객체로 묶여 전달

// 5. props는 왜 수정할 수 없을까?
// function Child({age}) {age = age + 1;} ❌ 안티패턴
// 이유
// - React는 예측 가능한 UI
// - 단방향 데이터 흐름 유지
// - 상태 관리 일관성 확보
// 📌 상태 변경은 state, 데이터 전달은 props

// 6. props로 함수 전달하기(아주중요)
// 6-1. 기본개념
const Child5 = ({ onClick }) => {
  return <button onClick={onClick}>클릭</button>;
};
// 📌 핵심
// - 함수도 값이다(First-Class Citizen)
// - 부모의 로직을 자식이 실행 가능

// 6-2. 데이터와 함께 전달
// -> 이것이 자식 -> 부모 통식 패턴
function Child6({ onSend }) {
  return (
    <button
      onClick={() => {
        onSend("엄마찬스");
      }}
    >
      전송
    </button>
  );
}

const Child7 = ({ onSend }) => {
  return (
    <button
      onClick={() => {
        onSend("할머니 찬스");
      }}
    >
      눌러
    </button>
  );
};

// 7. props.children(중요개념)
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// 동작구조
// Card({children: (
//     <>
//        <h2>제목</h2>
//        <p>내용</p>
//     </>
//    )
//  });
// 📌 children은
// - 컴포넌트 사이에 감싸진 모든 JSX
// - 레이아웃 / 공통 UI 컴포넌트에 필수

const Parent = () => {
  const age = 7;

  const handleClick = () => {
    console.log("아빠찬스");
  };

  function receive(data) {
    console.log(data);
  }

  return (
    <>
      <Child1 name="soyul" address="paju" />
      <Child5 onClick={handleClick} />
      <Child6 onSend={receive} />
      <Child7 onSend={receive} />
      <Card>
        <h2>제목</h2>
        <p>내용</p>
      </Card>
      <Child2 age={age} />
      <Child3 food="아이스크림" play="자전거" />
      <Child4 name="park" age="45" />
    </>
  );
};

// 8. 실무 관점 정리
// props 사용목적
// 목적	          설명
// 데이터전달	     부모 → 자식
// UI재사용	       동일 컴포넌트에 다른 값
// 이벤트위임	      함수전달
// 레이아웃	        children 활용

// 언제 props를 쓰고 언제 state를 쓰나?
// 구분	  props	    state
// 소유	  부모	     컴포넌트 자신
// 수정	  ❌	       ✅
// 전달	  가능	     불가
// 역할	  데이터전달	상태관리

// 9. 한 문장 요약
// props는 “부모가 자식에게 데이터를 전달하는 읽기 전용 객체”이며,
// React의 단방향 데이터 흐름을 유지하는 핵심 메커니즘이다.

export default Parent;
