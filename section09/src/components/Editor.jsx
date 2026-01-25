import "./Editor.css";
import { useState, useRef } from "react";

// 1. Editor컴퍼넌트에서 추가 번트이 클릭되어 onSubmit함수가 실행
// 2. onSubmit함수가 실행되면 App컴퍼넌트로 부터 전달받은 onCreate함수 실행
// 3. onCreate함수가 호출되면서 input테그에 입력한 값이 content를 인수로 전달

const Editor = ({ onCreate }) => {
  // input에서 입력되는 값을 이벤트 헨들러로 가져오기
  // 입력된 값을 state로 받아 content값 변경
  const [content, setContent] = useState("");

  // 빈입력 시 포커스 선택자로 사용
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // 엔터키 입력 추가
  // 입력값이 13(엔터)이라면 onSubmit()실행
  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  // button 속성으로 onClick이벤트 onSubmit함수 실행
  // onSubmit안에서 Editor컴포넌트에 매개변수로 전달받은 onCreate()함수 실행
  // 저장된 content값을 onCreate 인수로 전달
  const onSubmit = () => {
    // 빈입력 방지 코드
    // 비입력 시 포커스 기능
    if (content === "") {
      contentRef.current.focus();
      return;
    }
    onCreate(content);

    // 입력 후 추가버튼 클릭 다음 input reset
    setContent("");
  };

  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        onKeyDown={onKeydown}
        onChange={onChangeContent}
        placeholder="todo를 입력하세요"
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
