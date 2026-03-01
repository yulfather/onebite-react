import './TodoItem.css';
import { memo } from 'react';

function TodoItem({ id, isDone, content, date, onUpdate, onDelete }) {
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onDeleteButton}>삭제</button>
    </div>
  );
}

export default memo(TodoItem);

// export default memo(TodoItem, (prevProps, nextProps) => {
//   // 반환값에 따라, Props 변경 여부 판다
//   // T -> Props 변경없음 -> 리렌더X
//   // F -> Props 변경 -> 리렌더O

//   if (prevProps.id !== nextProps.id) return false;
//   if (prevProps.isDone !== nextProps.isDone) return false;
//   if (prevProps.content !== nextProps.content) return false;
//   if (prevProps.date !== nextProps.date) return false;

//   return true;
// });
