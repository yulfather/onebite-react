import './List.css';
import { useState, useMemo, useContext } from 'react';
import {
  todosStateContext,
  todosDispatchContext,
} from '../contexts/TodoContext';
import TodoItem from './TodoItem';

function List() {
  const [search, setSearch] = useState('');

  const { onUpdate, onDelete } = useContext(todosDispatchContext);

  const todos = useContext(todosStateContext);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredTodos = () =>
    todos.filter((item) =>
      item.content.toLowerCase().includes(search.toLowerCase()),
    );

  const filteredTodos = getFilteredTodos();

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((item) => item.isDone).length;

    return {
      totalCount,
      doneCount,
      notDoneCount: totalCount - doneCount,
    };
  }, [todos]);

  return (
    <div className="List">
      <h3>Todo List🌏</h3>
      <div>
        <div>totalCout: {totalCount}</div>
        <div>doneCount: {doneCount}</div>
        <div>notDoneCount: {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어 입력"
      />
      <div className="todos_wrapper">
        {filteredTodos.map((item) => (
          <TodoItem
            key={item.id}
            {...item}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default List;
