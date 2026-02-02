import './List.css';
import TodoItem from './TodoItem';
import { useState, useMemo, useContext } from 'react';
import { TodoStateContext } from '../App';

const List = () => {
  const todos = useContext(TodoStateContext);
  const [search, setSearch] = useState('');

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const EMPTY_TODO = [];
  const safeTodos = Array.isArray(todos)
    ? todos
    : EMPTY_TODO;

  const filteredData = () => {
    if (search === '') {
      return safeTodos;
    }
    return safeTodos.filter((todo) =>
      todo.content
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  };

  const filteredTodos = filteredData();

  const { totalCount, doneCount, notDoneCount } =
    useMemo(() => {
      console.log('useMemo test');
      const totalCount = safeTodos.length;
      const doneCount = safeTodos.filter(
        (todo) => !todo.isDone,
      ).length;
      const notDoneCount = totalCount - doneCount;

      return {
        totalCount,
        doneCount,
        notDoneCount,
      };
    }, [safeTodos]);

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <div>
        <div>total : {totalCount}</div>
        <div>done : {doneCount}</div>
        <div>notDone : {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
};

export default List;
