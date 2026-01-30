import './TodoItem.css';
import { memo, useContext } from 'react';
import { TodoDispatchContext } from '../context/TodoContext';

function TodoItem({ id, isDone, content, date }) {
  const { onUpdate, onDelete } = useContext(
    TodoDispatchContext,
  );

  const onChangeChecbox = () => {
    onUpdate(id);
  };

  const onClickDelete = () => {
    onDelete(id);
  };
  return (
    <div className="TodoItem">
      <div className="id">{`${id + 1}. `}</div>
      <input
        onChange={onChangeChecbox}
        readOnly
        checked={isDone}
        type="checkbox"
      />
      <div className="content">{content}</div>
      <div className="date">
        {new Date(date).toLocaleDateString()}
      </div>
      <button onClick={onClickDelete}>삭제</button>
    </div>
  );
}

export default memo(TodoItem);
