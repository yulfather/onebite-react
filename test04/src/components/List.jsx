import TodoItem from "./TodoItem";

function List() {
  return (
    <div>
      <h4>Todo List🤓</h4>
      <input placeholder="검색어를 입력하세요" />
      <div>
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </div>
    </div>
  );
}

export default List;
