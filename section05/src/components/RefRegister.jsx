import { useState, useRef } from "react";

// 1. useRef
// -> 컴포넌트 내부에 새로운 Reference 객체를 생성하는 기능
// const refObject = useRef();

// useRef vs useState -> 컴포넌트 내부의 변수로 활용 가능
// - useRef: Reference 객체를 생성 - 어떤 경우에도 리렌더링을 유발하지 않음
// - useState: State 객체를 생성 - 값이 변경되면 컴포넌트 리렌더링

const RefRegister = () => {
  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: "",
  });

  // useRef()호출하면 내부에 current라는 객체가 존재 -> Reference객체
  // 즉 current에 값을 담아둘수 있음
  // useRef(초기값)으로 값을 전달

  // 만약 버튼으로 값을 증가시킨다면 클릭에 따라 리렌더링이 발생하지 않고
  // useRef만 실행
  const countRef = useRef(0);

  // 선택자로 활용가능한 useRef()
  // 인풋 테그가 렌더링하는 DOM요소가 inputRef에 할당한 Reference오프젝트에 저장됨
  const inputRef = useRef();

  // let count = 0; 일반변수 사용하면 안되는 이유
  //  -> React에서 렌더링 = 컴포넌트 함수 재실행
  // 현재 RefRegister컴포넌트 안에서 선언된 일반변수는 렌더링 될때만다 초기화됨
  // useRef, useState 값이 유지되게 설계되어 렌더링에 따라 초기값이 영향받지 않음
  // 만약, 컴포넌트 밖에서 전역변수로 선언되면 값은 유지 됨
  // 하지만 심각한 오류를 발생 해당 컴포넌트가 두번 리턴되는 상황이면 전역변수가 공유되는 것처럼 작동

  const handleChange = (e) => {
    countRef.current++;
    console.log(countRef.current);
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  // useRef 선택자로 활용
  const onSubmit = () => {
    if (input.name === "") {
      inputRef.current.focus();
      // 인풋에 입력한 값이 빈문자열이 라면
      // 이름을 입려하라는 의미로 이름을 입력하는 DOM 요소 포커스 실행
      console.log(inputRef.current);
    }
  };

  return (
    <div>
      <div>
        <input
          ref={inputRef}
          name="name"
          value={input.name}
          onChange={handleChange}
          placeholder="name"
        />
        {input.name}
      </div>
      <div>
        <input
          type="date"
          name="birth"
          value={input.birth}
          onChange={handleChange}
        />
        {input.birth}
      </div>
      <div>
        <select name="country" value={input.country} onChange={handleChange}>
          <option value=""></option>
          <option value="kr">korea</option>
          <option value="cn">china</option>
          <option value="us">america</option>
          <option value="uk">englend</option>
        </select>
        {input.country}
      </div>
      <div>
        <textarea
          name="bio"
          value={input.bio}
          onChange={handleChange}
        ></textarea>
        {input.bio}
      </div>

      <button onClick={onSubmit}>send</button>

      <p>---------------------------------------</p>
    </div>
  );
};

export default RefRegister;
