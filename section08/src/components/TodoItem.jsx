import './TodoItem.css';
import { memo } from 'react';

const TodoItem = ({
  id,
  isDone,
  content,
  date,
  onUpdate,
  onDelete,
}) => {
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
      <div className="date">
        {new Date(date).toLocaleDateString()}
      </div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};

// checkbox 초기설정 시
// checked라는 props만 전달하고 onChange 이벤트 핸들러는 설정하지 않았다고 error발생
// 초기에 check box수정 기능이 없어 수정할 수 없음
// 그냥 둬도 되는데 초기설정이 어렵다는 이유로 속성값 "readOnly" 추가

// 고차 컴포넌트 (HOC) - React.memo
// -> 아래 코드는 비효율 적인 코드 비교대상이 증가함에 따라 코드를 추가해야한다.
// -> 리렌더링이 발생하는 함수 컴포넌트가 Props에 값을 바꾸면 리렌더링이 되니까
//    렌더링전 코드와 이후 코드를 비교하여 값이 같다면 True를 반환

// 아래 처럼 여러줄에 코드를 작성하려면 해당함수를 호출하는 컴퍼넌트에서 useCallback 사용
// export default memo(TodoItem, (prevTodos, nextTodos) => {
//   if (prevTodos.id !== nextTodos.id) return false;
//   if (prevTodos.isDone !== nextTodos.isDone) return false;
//   if (prevTodos.content !== nextTodos.content) return false;
//   if (prevTodos.date !== nextTodos.date) return false;

//   return true;
// });
export default memo(TodoItem);
