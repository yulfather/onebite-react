import "./TodoItem.css";

// id, isDone, content, date 구조분해할당으로 받아
// input checkbox에 속성으로 isDone을 전달
// div content에 -> content전달
// div date에 -> date전달

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  // onClick이 아니라 onChange이벤트를 사용한 이유는 적용 대상이 input태그라 그럼
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDelete = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <input
        onChange={onChangeCheckbox}
        readOnly
        checked={isDone}
        type="checkbox"
      />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDelete}>삭제</button>
    </div>
  );
};

export default TodoItem;
