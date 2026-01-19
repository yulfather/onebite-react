import { useState } from "react";

// 간단한 회원가입 폼
// 1. 사용자 이름
// 2. 생년월일
// 3. 국적
// 4. 자기소개

const Register = () => {
  const [name, setName] = useState("이름");
  const [birth, setBirth] = useState("생년월일");
  const [country, setCountry] = useState("사는곳");
  const [bio, setBio] = useState("본문");

  // onChange에 매개변수로 사용되어 이벤트 객체를 호출할 함수
  // 인풋창에 입력이 되면 감지해여 이벤트헨들러 함수 호출
  // 콘솔창에 호출된 SyntheticBaseEvent -> target -> value값 지정
  // onChangeName안에서 setName이 호출되면서 name값이 최종적으로 지정됨
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeBirth = (e) => {
    setBirth(e.target.value);
  };

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onChangeBio = (e) => {
    setBio(e.target.value);
  };

  // 인풋에 값이 변경되었을때를 의미하는 onChange설정
  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} placeholder="name" />
        {name}
      </div>

      <div>
        <input value={birth} type={"date"} onChange={onChangeBirth} />
        {birth}
      </div>

      <div>
        <select value={country} onChange={onChangeCountry}>
          <option value={""}></option>
          <option value={"kr"}>korea</option>
          <option value={"us"}>america</option>
          <option value={"uk"}>englend</option>
        </select>
        {country}
      </div>

      <div>
        <textarea value={bio} onChange={onChangeBio} placeholder="본문" />
        {bio}
      </div>
    </div>
  );
};

export default Register;
