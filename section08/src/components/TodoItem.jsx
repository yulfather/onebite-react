import "./TodoItem.css";

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
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
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};

// checkbox 초기설정 시
// checked라는 props만 전달하고 onChange 이벤트 핸들러는 설정하지 않았다고 error발생
// 초기에 check box수정 기능이 없어 수정할 수 없음
// 그냥 둬도 되는데 초기설정이 어렵다는 이유로 속성값 "readOnly" 추가

export default TodoItem;
