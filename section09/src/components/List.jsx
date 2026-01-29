import './List.css';
import TodoItem from './TodoItem';
import { useState, useMemo } from 'react';

// App에서 전달된 todos를 구조분해할당으로 List컴포넌트 매개변수로 받는다.
// 전달된 todos의 배열을 todos.map(() => {})구조로 받아 새로운 배열을 리터한다
// React에서는 map() 메서드를 활요하여 배열에 담긴 데이터를 리스트 형태로 렌더링 가능
// map(() => {}) 메서드의 일반적인 HTML태그뿐만 아니라 React컴포넌트도 렌더링가능

// 주의할점
// React에서는 내부적으로 리스트 형태로 렌더링된 컴퍼넌트 또는 요소를 구분할때
// 각각의 요소를 Key라는 prop을 통해서 구분
//  -> 따라서 todo라는 리스트 형태를 렌더링 할 때에는 반드시 key={props}을
//     고유한 값으로 전달해야함

// 검색기능 -> 검색어 변경시 리렌더링
// 현재 검색어를 state로 보관할 필요 있음

const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState('');

  // 검색 인풋에 입력된 값들이 search에 저장
  // search state에 값이 바뀔때마다 리렌더링이 발생
  // 현재 검색결과에 해당하는 값들만 필터링 진행
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === '') {
      return todos;
    }
    // filter() 내부 함수에 반환값이 true인 경우에 값들만 새배열 만들어 담음
    // includes(search) 인수에 포함된 값들만 true반환

    // 주의
    // filter 안의 콜백 함수는 반드시 true / false를 return 해야 함
    // 만약 {} 를 썼는데 return을 안붙였다면 undefined을 반환
    // → 그래서 콜백은 항상 undefined를 반환
    // → undefined === false 취급
    // → 결과: 항상 빈 배열
    // {} 사용했다면 return을 명시
    // return을 사용안할라믄 {}중괄호 제거 (중괄호 {} 제거 → 자동 return)
    return todos.filter((todo) =>
      todo.content
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  };

  // getFilteredData() 리렌더링 될때만 함수실행
  // 필터링된 todos값을 사용하도록 만듬
  const filteredTodos = getFilteredData();

  const { totalCount, doneCount, notDoneCount } =
    useMemo(() => {
      console.log('useMemo 실행');
      const totalCount = todos.length;
      const doneCount = todos.filter(
        (todo) => !todo.isDone,
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
};

export default List;
