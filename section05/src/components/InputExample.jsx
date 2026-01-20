import { useState } from "react";

// 1. 왜 State로 사용자 입력을 관리할까?
// -> 사용자 입력은 계속 변하는 데이터
//  - input에 타이핑
//  - 체크박스 클릭
//  - 셀렉트 선택
//  - 폼 제출
// -> 변경될 때마다 화면(UI)이 즉시 반영되어야 함
// -> React에서는 이 역할을 State가 담당

// 즉 -> State = 사용자 입력의 "현재상태"를 저장하는 공간

// 2. 기본 개념: Controlled Component
// React에서 사용자 입력을 관리하는 정석 패턴

// 핵심정의 : 입력값(value)을 State가 완전히 제어하는 컴포넌트

// 사용자입력 -> onChange 이벤트 발생 -> setState호출 -> State변경 -> 리렌더링 -> input value갱신

// 3. 가장 기본적인 예제(input + state)

// 3-1. 코드
function InputExample1() {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <div>
        <input value={text} onChange={handleChange} />
      </div>
      <p>입력값: {text}</p>
      <p>----------------------------------</p>
    </>
  );
}

// 3-2. 여기서 중요한 포인트
// 요소	              역할
// value={text}	     input의 값을 state와 동기화
// onChange	         사용자의 입력 감지
// e.target.value	   사용자가 입력한 실제 값
// setText()	       state 변경 → 리렌더링

// 4. 내부 동작 원리(아주중요)
//  -> 타이핑할 때 실제로 벌어지는 일
//  1). 사용자가 키 입력
//  2). 브라우저가 onChange 이벤트 발생
//  3). React가 이벤트 SyntheticEvent객체(e) 전달
//  4). setText(e.target.value) 실행
//  5). React가 state 변경 감지
//  6). 컴포넌트 재실해(리렌더링)
//  7). 새로운 value={text}가 input에 반영
// -> input은 스스로 값을 바꾸지 않는다.
// -> 항상 State를 통해서만 변경

// 5. 여러 입력값 관리하기 (실무 핵심)
// 5-1. 객체 State 패턴(폼에서 가장 많이 사용)

// 5-2. 이 패턴이 중요한 이유
// - input이 많아져도 handler 1개로 처리 가능
// - 실무 폼 처리의 80% 이상이 이 구조

// 6. 체크박스 & 셀렉트 입력 관리
// 6-1. 체크박스

function InputExample2() {
  // 5. 여러 입력값 관리하기 (실무 핵심)
  // 5-1. 객체 State 패턴
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // 6. 체크박스 & 셀렉트 입력 관리
  // 6-1. 체크박스
  const [isChecked, setIsChecked] = useState(false);

  // 6-2. select
  const [role, setRole] = useState("user");

  // 5-1. 객체 State 패턴
  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // 6-1. 체크박스
  const checkedChange = (e) => {
    console.log(e);
    setIsChecked(e.target.checked);
  };
  // SyntheticEvent객체에서 checkbox는 value가 아니라 checked

  // 6-2. select
  const roleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <>
      <div>
        <input name="email" value={form.email} onChange={handleChange} />
      </div>

      <div>
        <input name="password" value={form.password} onChange={handleChange} />
      </div>

      <div>
        <input type="checkbox" checked={isChecked} onChange={checkedChange} />
      </div>

      <div>
        <select value={role} onChange={roleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <p>------------------------------------</p>
    </>
  );
}

export { InputExample1, InputExample2 };
