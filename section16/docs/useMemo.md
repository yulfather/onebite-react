1. useMemo

1) useMemo는 "비싼 계산 결과를 메모리에 저장 -> 필요할 때만 다시계산" 하는 훅

```jsx
const memoizedValue = useMemo(() => {
  return 계산결과;
}, [deps]);
```

- 계산 결과 기억(memoization)

- deps(의존성)가 바뀔때만 다시 계산

- 렌더링 중 불필요한 연산을 막는 성능 최적화용

2. useMemo필요성

- useMemo 미적용: state변경 -> 컴포넌트 재실행 -> 모든코드 다시 실행

```jsx
function App() {
  const [count, setCount] = useState(0);

  // 렌더링 될 때마다 매번 실행

  const heavyValue = heavyCalculation();

  return (
    <>
      <p>{heavyValue}</p>

      <button onClick={() => seCount(count + 1)}>+</button>
    </>
  );
}
```

- > count만 변경되어도 heavyCalculation()은 다시 실행

3. 비싼 계산

- 반복문이 많다

- 정렬/필터링

- 큰 배열 map/reduce

- 복잡한 수학연산

- API 결과 가공

```jsx
function heavyCalculation() {
  console.log('계산중...');

  let result = 0;

  for (let i = 0; i < 1000000; i++) {
    result += 1;
  }

  return result;
}
```

- 위에 코드가 렌더링마다 실행되면 성능이 내려감

4. useMemo 기본예제

```jsx
import { useMemo, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const [text, setText] = useState('');

  const heavyValue = useMemo(() => {
    console.log('무거운 계산 실행');

    let sum = 0;

    for (let i = 0; i < 100000000; i++) {
      sum += i;
    }

    return sum;
  }, []); // 의존성 없음 -> 최조 한번만 실행

  return (
    <>
      <p>{heavyValue}</p>

      <input value={text} onChange={(e) => setText(e.target.value)} />

      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
```

- 실행흐름

1. 첫 렌더링

- useMemo 콜백실행

- 결과를 메모리에 저장

- 의존성 없음

2. text, count 변경

- 컴포넌트 재렌더링

- useMemo 내부 계산은 실행 안됨

- 저장된 값 재사용

5. 의존성 배열이 바뀌면

```jsx
const result = useMemo(() => {
  return a + b;
}, [a, b]);
```

- a또는 b변경 -> 다시계산

- 그 외 state 변경 -> 기존 값 재사용

- > useEffect와 의존성 개념 동일

6. 실무에서 많이 사용되는 패턴

- useMemo 미 사용

```jsx

const filteredTodos = todos.filter((todo) => todo..conten.includes(search));

```

- > todos, search와 상관없는 state변경에도 매번 filter실행 성능저하

- useMemo적용

```jsx
const filteredTodos = useMemo(() => {
  console.log('필터링 실행');

  return todos.filter((todo) => todo.content.includes(search));
}, [todos, search]);
```

- todos 또는 search변경 시에만 필터링

- 렌더링 비용 감소

7. 작동원리

- useMemo 내부에서 일어나는 과정

- 렌더링

- >

- React가 이전 의존성 배열 기억

- >

- 현재 의존성과 비교(Object.is)

- >

- 같으면 -> 이전 계산 결과 반환

- 다르면 -> 콜백 재실행 후 결과 저장

- > 값을 캐싱하는구조

8. useMemo vs useEffect vs useCallback

- useMemo : 값(계산결과) 메모

- useCallback : 함수 메모

- useEffect : 부수 효과 처리

```jsx

useMemo(() => value, [deps]);

useCallback(() => func, [deps];);

useEffect(() => {사이드이펙트}, [deps]);

```

1. React.memo + useCallback + useMemo

- React.memo : props 변경이 없으면 자식 리렌더 막음

- useCallback : 함수 props의 참조(주소) 고정

- useMemo : 객체/배열 props의 참조(주소) 고정(+ 비싼 계산 캐시)

1. 삼종 훅이 필요한 이유

- 부모가 리렌더되면 자식도 기복적으로 리렌더됨

- 문제1 : 함수 props는 매 렌더마다 새로 만들어딤

```jsx

onClick={() => doSomething()}

```

- > 매번 새로운 함수(새 참조)

- 문제2 : 객체/배열 props도 매 렌더마다 새로 만들어짐

```jsx
const options = { sort: 'id' };
```

- > 매번 새로운 객체(새 참조)

- > > 그래서 React.memo(Child) 해도 props 참조가 바뀌었다고 판단 -> 자식 리렌더

2. 실전예제 : 리렌더 최적화

- 아래 예제는 부모의 count변경이 있어도 자식이 불필요한 리렌더 방지하는 구조

- App.jsx(부모)

```jsx
import { useCallback, useMemo, useState } from 'react';

import TodoList from './TodoList';

export default function App() {
  const [count, setCount] = useState(0);

  const [todos, setTodos] = useState([
    { id: 1, text: 'React', done: false },

    { id: 2, text: 'nextJs', done: false },
  ]);

  const [search, setSearch] = useState('');

  // 비싼 필터링 결과 캐싱 : todos/search 변경 시 재계산

  const filteredTodos = useMemo(() => {
    console.log('filtering recalculated');

    return todos.filter((t) =>
      t.text.toLowerCase().includes(searcht.toLowerCase()),
    );
  }, [todos, search]);

  // 객체 props 참조 고정(자식에게 options 내려줄때)

  const options = useMemo(() => {
    return { showDoneOnly: false };
  }, []);

  // 함수 props 참조 고정(자식에게 핸들러 내려줄 때)

  const onToggle = useCallback((id) => {
    seTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }, []);

  const onDelete = useCallback((id) => {
    seTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div>
      <h1>Parent count: {count}</h1>

      <button onClick={() => setCount((c) => c + 1)}>+ count</button>

      <div style={{ marginTop: 12 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search..."
        />
      </div>

      <TodoList
        todos={filteredTodos}
        options={options}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    </div>
  );
}
```

- TodosList.jsx(자식 : React.memo로 감싸기)

```jsx

import React from 'react';

function TodoList({todos, options, onToggle, onDelete}) {

console.log('TodoList rendered');

return (

<div style={{ marginTop: 16}}>

<div>optios.showDoneOnly: {String(options.showDoneOnly)}</div>

<ul>

{todos.map((t) => (

<li key={t.id}>

<label style={{ textDecoration: t.done ? 'line-through' : 'none'}}>

<input

type="checkbox"

check={t.done}

onChange={() => onToggle(t.id)}

/>

</label>

<button onClick={() => onDelete(t.id) style={{ marginLefte: 8}}}>

delete

</button>

</li>

))}

</ul>

</div>

)

}

export default React.memo(TodoList);

```

- 이 코드에서 삼종세트가 실제로 하는 일

1. React.memo(TodoList)

- 부모가 리렌더 -> TodoList의 props가 동일 -> TodoList렌더 스킵

2. useCallback(onToggle, onDelete)

- 함수 props는 원래 렌더마다 새로 만들어짐

- useCallback이 함수 참조 고정

- > memo비교 -> 같은함수 인정

- 주의 : setTodos(prev => ...) 형태 -> 의존성 배열이 빈배열이라 가능

3. useMemo(filteredTodos, options);

- filteredTodos는 배열 -> 배열도 참조 비교 대상

- useMemo로 todos/search 변경없음 배열 참조 재사용

- options객체 -> useMemo로 객체 참조 고정

- 삼조세트가 안먹히는 대표실수 3개

1. 실수1: useCallback인데 의존성배열에 state를 넣음

```jsx

const onToggle = useCallback(() => {

setTodos(todos.map(...)) // todos 직접 참조 x

}, [state]) // 의존성배열에 state값인 todos를 입력 -> todos변경시 함수 새로 생성

```

- > 해결 : 함수형 업데이트

```jsx

setTodos(prev => prev.map(...))

```

2. 실수2: memo child에 매번 새 객체 내려줌

```jsx
<TodoList optios={{ showDoneOnly: false }} /> // x 매번 새 객체
```

- > 해결 : useMemo로 고정

```jsx
const optios = useMemo(() => {
  return { showDoneOnly: false };
}, []);
```

3. 실수3: 자식이 memo인데 props가 많이 변경됨

- memo는 props 참조 안정화가 핵심

- 부모에서 매번 새로 만드는 값(객체/배열/함수)이 많으면 효과 없음

 
