import { useReducer } from "react";

const reducer = (state, action) => {
  const resetButton = state * 0;
  switch (action.type) {
    case "INCREASE":
      return state + action.data;
    case "DECREASE":
      return state + action.data;
    case "RESET":
      return resetButton;
  }
};

function Exam() {
  const [state, dispatch] = useReducer(reducer, 0);

  const onClictPlus = () => {
    dispatch({
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
      <button onClick={onClictPlus}>+</button>
      <button
        onClick={() => {
          dispatch({ type: "RESET" });
        }}
      >
        reset
      </button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
}

export default Exam;
