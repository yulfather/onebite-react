import './List.css';
import TodoItem from './TodoItem';
import { useState, useMemo, useContext } from 'react';
import { TodoStateContext } from '../App';

function List() {
  const todos = useContext(TodoStateContext);
  const [search, setSearch] = useState('');

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredTodo = () => {
    if (search === '') {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  };

  const filteredTodo = getFilteredTodo();

  // useMemo(callback, deps) -> 콜백함수와 의존성배열을 인자로 입력

  // 렌더리마다 호출되는 코드 낭비심함
  // -> 아래코드는 단순히 todos의 총수량과 isDone에 체크유무 판단을하느데
  //    아무 상관없는 검색기능을 사용할때도 렌더링이 발생할때만다 호출된다.

  // const getAnalyzedData = () => {
  //   console.log('getAnalyzedData 호출');
  //   const totalCount = todos.length;
  //   const doneCount = todos.filter(
  //     (todo) => todo.isDone,
  //   ).length;
  //   const notDoneCount = totalCount - doneCount;

  //   return {
  //     totalCount,
  //     doneCount,
  //     notDoneCount,
  //   };
  // };
  // const { totalCount, doneCount, notDoneCount } =
  //   getAnalyzedData();

  // 개선된 코드
  // useMemo의 콜백함수 안에 기존코드를 대입하여
  // 구조분해 할당으로 값을 전달
  // 해당코드는 최초 렌더링 1회 실행 후 다른 함수 호출에 영향받지 않는다
  // 의존성 배열에 참조되는값 즉 해당코드가 변경에 영향을 주는 값을 대입하여
  // 추가, 삭제, 체크에 값이 반을 하도록 함
  const { totalCount, doneCount, notDoneCount } =
    useMemo(() => {
      console.log('getAnalyzedData 호출');
      const totalCount = todos.length;
      const doneCount = todos.filter(
        (todo) => todo.isDone,
      ).length;
      const notDoneCount = totalCount - doneCount;

      return {
        totalCount,
        doneCount,
        notDoneCount,
      };
    }, [todos]);

  return (
    <div className="List">
      <h4>TodoList</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>notDone: {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todo_wrapper">
        {filteredTodo
          .sort((a, b) => b.id - a.id)
          .map((todo) => {
            return <TodoItem key={todo.id} {...todo} />;
          })}
      </div>
    </div>
  );
}

export default List;
