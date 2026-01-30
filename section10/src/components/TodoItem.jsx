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

// useCallback사용 없이 React.memo만 사용할 경우
//  -> props에 영향을 주는 함수 때문에 인수로 전달한 callback함수에서
//     하나하나 값을 비교하여 리렌더링을 막는다

// 고차 컴포넌트(HOC)
// memo(Component, callback(이전props, 다음props))
// 반환값에 따라, Props가 바뀌었는지 안바뀌었는지 판단
// True -> Props 바뀌지 않음 -> 리렌더링 X
// False -> props 바뀜 -> 리렌더링 O

// ⚠️ 거의 안 씀 (유지보수 어려움)
// export default memo(TodoItem, (prevProps, nextProps) => {
//   if (prevProps.id !== nextProps.id) return false;
//   if (prevProps.isDone !== nextProps.isDone) return false;
//   if (prevProps.content !== nextProps.content) return false;
//   if (prevProps.date !== nextProps.date) return false;

//   // 위에 값이 바뀌지 않았다면 trun를 리턴
//   return true;
// });

export default memo(TodoItem);
