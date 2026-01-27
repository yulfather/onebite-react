import "./List.css";
import TodoItem from "./TodoItem";

function List({ todos }) {
  return (
    <div className="List">
      <h4>Todo List🌱</h4>
      <input placeholder="검색어를 입력하세요" />
      <div className="item_wrapper">
        {todos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
}

export default List;
