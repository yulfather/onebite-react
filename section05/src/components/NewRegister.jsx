import { useState } from "react";

// State로 사용자 입력 관리하기 2

// 여러개의 State를 하나의 State로 변경

const NewRegister = () => {
  // useState 초기값으로 객체를 전달
  // input = {name: "", birth: "", country: "", bio: "",}
  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: "",
  });
  console.log(input);

  // 이벤트헨들러 설정
  // setInput을 실행시켜 기존 input값을 변경
  // ...input으로 스프레드 연산자를 사용하여 지정한 name(key)과 value가 완전대체 되지 못하게
  // 관련없는 값이 유지 될수 있도록 설정
  const onChangeName = (e) => {
    setInput({
      ...input,
      name: e.target.value,
    });
  };

  const onChangeBirth = (e) => {
    setInput({
      ...input,
      birth: e.target.value,
    });
  };

  const onChangeCountry = (e) => {
    setInput({
      ...input,
      country: e.target.value,
    });
  };

  const onChangeBio = (e) => {
    setInput({
      ...input,
      bio: e.target.value,
    });
  };

  // 개선된 이벤트 핸들러1
  const onChange1 = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // 개선된 이벤트 헨들러2
  const onChange2 = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        <input name="name" value={input.name} onChange={onChange2} />
        {input.name}
      </div>
      <div>
        <input
          name="birth"
          value={input.birth}
          onChange={onChange2}
          type="date"
        />
        {input.birth}
      </div>
      <div>
        <select name="country" value={input.country} onChange={onChange2}>
          <option value=""></option>
          <option value="kr">korea</option>
          <option value="ua">america</option>
          <option value="uk">englend</option>
        </select>
        {input.country}
      </div>
      <div>
        <textarea name="bio" value={input.bio} onChange={onChange2}></textarea>
        {input.bio}
      </div>
      <p>-------------------------------</p>
    </div>
  );
};

export default NewRegister;
