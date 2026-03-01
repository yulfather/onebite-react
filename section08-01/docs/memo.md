1. React.memo

- 부모가 리렌더링 -> props가 변경되지 않으면 자식 컴포넌트를 재렌더링 하지 않도록 막는 훅

```jsx
import { meo } from 'react';

const Child = memo(function Child({ value }) {
  console.log('Child Render');
  return <div>{value}</div>;
});
```

- memo()는 컴포넌트를 감싸는 고차 컴포넌트(HOC)

2. 필요한 이유

- React의 기본 동작 원리 : 부모 리렌더 -> 자식 전부 리렌더
- React는 기본적으로 Virtual DOM diff를 하기 전에 컴포넌트를 먼저 실행
- 즉:

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child value="고정값" />
    </>
  );
}
```

- count가 변겨오디면 Parent가 다시 시랳
- > Child도 다시 실행
- > 그런데 Child는 항상 같은 props를 받고 있음 -> 이게 낭비임

3. React.memo 내부 동작 원리

- 핵심: shallow compare(얕은비교) -> React.memo는 다음과 같이 동작
- 이전 props vs 현재 props
- > 얕은비교(===)
- > 같으면 렌더링 스킵
- > 다르면 렌더링 진행

- 얕은비교

```jsx
prevProps.value === nextProps.value;
```

- 객체

```jsx
prevProps.obj === nextProps.obj;
```

- 내용(값)비교가 아닌 "참조값(주소) 비교"

4. 실무 예제1 - 기본 최적화

```jsx
function Child({ name }) {
  console.log('Child Render');
  return <div>{name}</div>;
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(coutn + 1)}>+</button>
      <Child neme="soyul" />
    </>
  );
}
```

- > 버튼 누를 때마나 Child Reder 출력

- meomo 적용

```jsx
const Child = memo(function Child({ name }) {
  console.log('child render');
  return <div>{name}</div>;
});
```

- > 이제 name이 바뀌지 않으면 Child는 리렌더링되지 않음

5. memo가 안 먹히는 이유

- 함수 props문제

```jsx
<Child onClick={() => console.log('hi')} />
```

- > 이건 매 렌더마다 새로운 함수 생성
- > 새로운 참조값 -> shallow compare(얕은 비교) 실패 -> 리렌더 발생

- 해결: useCallback

```jsx
const handleClick = useCallback(() => {
  cosole.log("hi");
}, [])

<Child onClick={handleClick}/>
```

- > 이제 참조값 유지

6. React.memo + useCallback + useMemo
   도구 무엇을고정? 목적
   React.memo 컴포넌트 렌더링 불필요한 재렌더 방지
   useCallback 함수 참조값 props 변경 방지
   useMemo 계산 결과 참조값 객체/배열 변경 방지

7. 실무예제2 - 리스트 최적화(중요)

- 기본구조:

```jsx
{
  todos.map((todo) => <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} />);
}
```

- App이 리렌더되면 모든 TodoItem 다시 리렌더 수천 개면 성능저하

- 최적화 구조

- 자식 컴포넌트

```jsx
const TodoItem = memo(function TodoItem({ id, content, isDone, onUpdate }) {
  console.log('render:', id);

  return (
    <div>
      <input type="checkbox" checked={isDone} onChange={() => onUpdate(id)} />
      {content}
    </div>
  );
});
```

- 부모컴포넌트

```jsx
const onUpdate = useCallback((id) => {
  dispatch({ type: 'UPDATE', targetId: id });
}, []);
```

- > 변경된 todo만 렌더됨 -> 나머지는 스킵

8. React.memo의 커스텀 비교 함수

- 기본은 shallow compare(얕은비교)지만, 직접 비교 로직을 만들 수 있다

```jsx
const Child = memo(
  function Child({ user }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.user.id === nextProps.user.id;
  },
);
```

- return true -> 렌더링 스킵
- return false -> 렌더링 실행
