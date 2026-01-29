import './List.css';
import TodoItem from './TodoItem';
import { useState } from 'react';

function List({ todos, onUpdate, onDelete }) {
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

  return (
    <div className="List">
      <h4>TodoList</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todo_wrapper">
        {filteredTodo
          .sort((a, b) => b.id - a.id)
          .map((todo) => {
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
