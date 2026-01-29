1. useMemo

- "메모이제이션" 기법을 기반으로 불 필요한 연산을 최적화 하는 리액트 훅
  -> 자매품 : useCallback

- 반복적으로 수행되는 동일한 연산
- Task1 -> 결과값(메모리저장)
- Task2
- Task3
  -> 저장되어 있던 결과값을 다시 돌려줌

1. useMemo 한 줄 정의

- useMemo는 "비싼 계산 결과를 메모리에 저장, 필요할 때만 다시 계산"

```jsx
const memoizedValue = useMemo(() => {
  return 계산결과;
}, [의존성]);
```

- 계산 결과를 기억(memoization)
- 의존성이 바뀔 대만 다시 계산
- 렌더링 중 불필요한 연산을 막는 성능 최적화용 훅

2. 왜 useMemo가 필요한가?
   ❌ 기본 React 렌더링 특징
   -> state변경 -> 컴포넌트 재실행 -> 모든 코드 다시 실행

```jsx
function App() {
  const [count, setcount] = useState(0);

  // ! 렌더링 될 때마다 매번 실행
  const heavyValue = heavyCalculation();

  return (
    <>
      <p>{heavyValue}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
```

❌count만 바뀌어도 heavyCalculation()은 다시 실행됨

3. "비싼계산"이란

- 반복문이 많다
- 정렬 / 필터링
- 큰 배열 map/filter/reduce
- 복잡한 수학 연산
- API 결과 가공

```jsx
function heavyCalculation() {
  console.log('계산중...');
  let result = 0;
  for(let i = 0; i < 1000000; i++) {
    result +=1 i;
  }
  return result;
}
```

-> 이런게 렌더링마다 돌면 체감 성능이 바로 떨어짐

4. useMomo 기본예제(핵심)

```jsx
import { useMemo, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const heavyValue = useMemo(() => {
    console.log('무거운 계산 실행');
    let sum = 0;
    for (let i = 0; i < 10000000; i++) {
      sum += i;
    }
    return sum;
  }, []);
  // 의존성 없음 -> 최초 1번만 실행
  // 의존성 있음 -> 의존성이 바뀔때만 변경

  return (
    <>
      <p>{heavyValue}</p>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
```

- 실행흐름

1.  첫 렌더링

- useMemo 콜백 실행
- 결과를 메모리에 저장

2.  text, count 변경

- 컴포넌트 재렌더링
- useMemo 내부 계산은 실행 안됨
- 저장된 값 재사용

5. 의존성 배열이 바뀌면

```jsx
const result = useMemo(() => {
  return a + b;
}, [a, b]);
```

상황 결과
a 또는 b 변경 다시 계산
그 외 state 변경 기존 값 재사용

6. 실무에서 제일 많이 쓰는 패턴(배열 필터링)

❌ useMemo 없을 때

```jsx
const filteredTodos = todos.filter((todo) =>
  todo.content.includes(search),
);
```

- todos, search와 상관없는 state 변경에도 매번 filter 실행

✅ useMemo 적용

```jsx
const filteredTodos = useMemo(() => {
  console.log('필터링 실행');
  return todos.filter((todo) =>
    todo.content.includes(search),
  );
}, [todos, search]);
```

✔️ todos 또는 search 바뀔 때만 필터링
✔️ 렌더링 비용 ↓

7. 작동 원리 (중요 🔥)
   useMemo 내부에서 실제로 일어나는 일
   렌더링 시작
   ↓
   React가 이전 의존성 배열 기억
   ↓
   현재 의존성과 비교 (Object.is)
   ↓
   같으면 → 이전 계산 결과 반환
   다르면 → 콜백 재실행 후 결과 저장
   👉 값을 캐싱(cache) 하는 구조

8. useMemo vs useEffect vs useCallback
   훅 목적
   useMemo 값(계산 결과) 메모
   useCallback 함수 메모
   useEffect 부수 효과 처리

```jsx
useMemo(() => 값, []);
useCallback(() => 함수, []);
useEffect(() => {
  사이드이펙트;
}, []);
```

9. 언제 쓰면 ❌ 오히려 손해?
   ❌ 이런 경우

```jsx
const value = useMemo(() => a + b, [a, b]);
```

- 계산이 너무 가벼움 오히려 의존성 비교 비용이 더 큼
  👉 useMemo는 무조건 쓰는 훅 아님

10. useMemo 사용 기준 (실전 체크리스트)

✅ 이런 경우 써라

- 계산이 무겁다
- 렌더링이 잦다
- 큰 배열 map / filter
- 자식 컴포넌트 props로 내려가는 값

❌ 이런 경우 쓰지 마라

- 단순 계산
- 렌더링 성능 문제 없음
- 가독성만 나빠질 때

11. 한 문장으로 정리
    useMemo는 “렌더링 중 매번 다시 계산할 필요 없는 값을 기억해서 성능을 지키는 훅”이다
