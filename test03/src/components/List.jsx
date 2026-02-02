import './List.css';
import TodoItem from './TodoItem';
import { useState, useMemo, useContext } from 'react';
import { TodosStateContext } from '../context/TodoContext';

function List() {
  const todos = useContext(TodosStateContext);
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

  const filterTodos = getFilteredData();

  // const getAnalyzedData = () => {
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

  const { totalCount, doneCount, notDoneCount } =
    useMemo(() => {
      console.log('getAnalyzedData 실행');
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
      <h4>Todo List🌱</h4>
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
      <div className="item_wrapper">
        {filterTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
}

export default List;
