import './TodoItem.css';
import { memo } from 'react';

function TodoItem({
  id,
  isDone,
  content,
  date,
  onUpdate,
  onDelete,
}) {
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onChangeDelete = () => {
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
      <div className="date">
        {new Date(date).toLocaleDateString()}
      </div>
      <button onClick={onChangeDelete}>삭제</button>
    </div>
  );
}

// export default memo(TodoItem, (prevTodos, nextTodos) => {
//   if (prevTodos.id !== nextTodos.id) return false;
//   if (prevTodos.isDone !== nextTodos.isDone) return false;
//   if (prevTodos.content !== nextTodos.content) return false;
//   if (prevTodos.date !== nextTodos.date) return false;

//   return true;
// });

export default memo(TodoItem);
