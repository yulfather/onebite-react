import './List.css';
import TodoItem from './TodoItem';
import { useState, useMemo } from 'react';

function List({ todos, onUpdate, onDelete }) {
  const [search, setSearch] = useState('');

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === '') {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  };

  const fiteredTodo = getFilteredData();

  // const getAnalyzedDate = () => {
  //   console.log('getAnalyzedDate 호출');
  //   const totalCount = todos.length;
  //   const doneCount = todos.filter(
  //     (todo) => todo.isDone,
  //   ).length;
  //   const notDoneCount = totalCount - doneCount;

  //   return { totalCount, doneCount, notDoneCount };
  // };

  // const { totalCount, doneCount, notDoneCount } =
  //   getAnalyzedDate();

  // useMemo 적용 코드
  const { totalCount, doneCount, notDoneCount } =
    useMemo(() => {
      console.log('getAnalyzedDate 호출');
      const totalCount = todos.length;
      const doneCount = todos.filter(
        (todo) => todo.isDone,
      ).length;
      const notDoneCount = totalCount - doneCount;

      return { totalCount, doneCount, notDoneCount };
    }, [todos]);

  return (
    <div className="List">
      <h4>Todo List☘️</h4>
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
      <div className="todos_wrapper">
        {fiteredTodo.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default List;
