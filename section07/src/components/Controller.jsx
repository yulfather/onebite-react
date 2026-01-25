// 주의할점
// 표현식	                             의미
// onClick={onClickButton}	          클릭 시 함수 실행
// onClick={() => onClickButton(-1)}	클릭 시 인자 포함 실행
// onClick={onClickButton(-1)}	      렌더링 중 즉시 실행 ❌
// -> 이벤트 핸들러에는 “함수 실행 결과”가 아니라 “실행할 함수”를 넘겨야 한다

const Controller = ({ onClickButton }) => {
  return (
    <div>
      <button
        onClick={() => {
          onClickButton(-1);
        }}
      >
        -1
      </button>
      <button
        onClick={() => {
          onClickButton(-10);
        }}
      >
        -10
      </button>
      <button
        onClick={() => {
          onClickButton(-100);
        }}
      >
        -100
      </button>
      <button
        onClick={() => {
          onClickButton(+100);
        }}
      >
        +100
      </button>
      <button
        onClick={() => {
          onClickButton(+10);
        }}
      >
        +10
      </button>
      <button
        onClick={() => {
          onClickButton(+1);
        }}
      >
        +1
      </button>
    </div>
  );
};
export default Controller;
