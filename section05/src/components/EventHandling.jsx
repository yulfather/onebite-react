// 1. Event Handling
// - 웹 내부에서 발생하는 사용자의 행동(버튼클릭, 메세지입력, 스크롤)
// - 이벤트가 발행했을 때 그것을 처리하는 것(버튼 클릭시 경고창)

// 2. 버튼을 클릭했을때 발생하는 동작
// onClick속성에 익명함수 설정
// 코드가 길다면 변수에 담아서 전달하는 것도 가능
// 변수를 전달할때 onClick속성값에 함수명만 전달
//  -> onClickButton() 전달하게 되면 즉시실행됨.

// 3. 이벤트 객체
// -> 이벤트핸들러 함수를 호출하면서 매개변수로 이벤트 객체를 전달
// -> 버튼클릭하면 SyntheticBaseEvent(합성이벤트객체) 객체가 출력됨
// -> SyntheticBaseEvent 객체가 "e"에 저장된 이벤트 객체
// -> 합성이벤트: 모든 웹 브라우저의 이벤트 객체를 하나로 통일한 형태
const EventHandlerButton = ({ children, name, color = "black" }) => {
  const onClickButton = (e) => {
    console.log(e);
    console.log(name);
  };
  return (
    <>
      <button
        onClick={onClickButton}
        // onMouseEnter={() => {console.log(name);}}
        style={{ color: color }}
      >
        {name}
        {children}
      </button>
    </>
  );
};

export default EventHandlerButton;
