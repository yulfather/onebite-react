import "./TodoItem.css";

function TodoItem() {
  return (
    <div className="TodoItem">
      <input type="checkbox" />
      <div>content</div>
      <div>date</div>
      <button>삭제</button>
    </div>
  );
}

export default TodoItem;
