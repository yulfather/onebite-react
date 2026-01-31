import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE':
      return state + action.data;
    case 'DECREASE':
      return state + action.data;
    case 'RESET':
      return state * action.data;
    default:
      return state;
  }
};

function Exam() {
  const [state, dispatch] = useReducer(reducer, 0);

  const dispatchCounter = (type, data) =>
    dispatch({ type, data });

  const onClickPlus = () => dispatchCounter('INCREASE', 1);
  const onClickMinus = () =>
    dispatchCounter('DECREASE', -1);
  const onClickReset = () => dispatchCounter('RESET', 0);

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickReset}>reset</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
}

export default Exam;
