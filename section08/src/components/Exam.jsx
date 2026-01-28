import { useReducer } from "react";

// const [state, dispatch] = useReducer(reducer, 0)
//  -> [초기값, action] = useReducer(변환함수, 초기세팅)

// reducer: 변환기
// -> 상태를 실제로 변화시키는 변환기 역할
// -> reducer(현재의state값, 액션객체)
function reducer(state, action) {
  const initialState = state * 0;

  switch (action.type) {
    case "INCREASE":
      return state + action.data;
    case "DECREASE":
      return state + action.data;
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function Exam() {
  // dispatch: 발송하다, 급송하다.
  // -> 상태 변화가 있어야 한다는 사실을 알리는, 발송하는 함수
  const [state, dispatch] = useReducer(reducer, 0);

  const onClickPlus = () => {
    // dispatch를 호출하여 상태변화 요청

    // 인수: 상태가 어떻게 변화되길 원하는지 정보전달
    // -> 보통의 사용방식은 인수로 객체를 전달하여 type이라는 프로퍼티를
    //    어떻게 변화시킬지 작성

    // "INCREASE"라는 type에 data값을 1만큼증가
    dispatch({
      // <-- 액션객체라 부른다(reducer()함수에 매개변수로 전달)
      type: "INCREASE",
      data: 1,
    });
  };

  const onClickMinus = () => {
    dispatch({
      type: "DECREASE",
      data: -1,
    });
  };

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={() => dispatch({ type: "RESET" })}>reset</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
}

export default Exam;
