import './List.css';
import TodoItem from './TodoItem';
import { useState, useMemo, useContext } from 'react';
import { TodoStateContext } from '../context/TodoContext';

function List() {
  const [search, setSearch] = useState('');
  const todos = useContext(TodoStateContext);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // Context 기본값 / Provider value가 늦게 채워짐
  //  -> props로 내려줄때 아직 전달이 안됨 -> undefined
  // 방어코드
  const EMPTY_TODOS = [];
  const safeTodos = Array.isArray(todos)
    ? todos
    : EMPTY_TODOS;

  const getFilteredTodo = () => {
    if (search === '') {
      return safeTodos;
    }
    return safeTodos.filter((todo) =>
      todo.content
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  };

  const filteredTodo = getFilteredTodo();

  const { totalCount, doneCount, notDoneCount } =
    useMemo(() => {
      console.log('getAnalyzedData 호출');
      const totalCount = safeTodos.length;
      const doneCount = safeTodos.filter((todo) => {
        return todo.isDone;
      }).length;
      const notDoneCount = totalCount - doneCount;

      return {
        totalCount,
        doneCount,
        notDoneCount,
      };
    }, [safeTodos]);

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
