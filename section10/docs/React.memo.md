1. React.memo 한 줄 정의

- props가 바뀌지 않았다면, 컴포넌트를 다시 렌더링하지 마라

```jsx
const MemoComponent = React.memo(Component);
```

- 함수 컴포넌트 전용
- 렌더링 결과를 메모이제이션(memoization)
- props 기준으로 이전 렌더 결과 재사용

2. 왜 필요한가?(사용목적)

- 부모 컴포넌트가 리렌더링되면 -> 자식 컴포넌트도 전부 리렌더링됨
  -> props가 안 바뀌었어도 다시 실행됨

- 문제 상황 -<성능낭비>-
  -> 자식 컴포넌트가 많다
  -> 연산이 무겁다
  -> 리스트 / 카드 /버튼이 많다

3. React.memo가 해결하는 것
   부모 리렌더링
   ↓
   자식 props 비교
   ↓
   props 동일 → 렌더링 스킵
   props 변경 → 다시 렌더링
   -> "같은 props면 이전 결과 재사용"

4. 기본예제(React.memo 없을때)

```jsx
function Child({ count }) {
  console.log('Child 렌더링');
  return <div>count: {count}</div>;
}

function Parent() {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState('');

  return (
    <>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => setNumber(number + 1)}>
        +
      </button>
      <Child count={number} />
    </>
  );
}
```

❌ 결과 - input에 글자만 쳐도 child 계속 렌더링됨

5. React.memo적용

```jsx
const Child = React.memo(function Child({count})) {
  console.log("Child 렌더링");
  return <div>count: {count}</div>
}
```

✅ 결과

- input 변경 -> Child렌더링 안됨
- count 변경 -> Child렌더링 됨

6. 내부 작동 원리

- React.memo는 내부적으로 얕은 비교(shallow comparison)를 한다
  -> 이전 props === 새로운 props ?

얕은 비교란?

- 원시값 -> 값 비교
- 객체/함수 -> 참조값 비교
  {a: 1} === {a: 1} // false

7. 그래서 자주 터지는 함정

❌ 객체를 props로 넘길 때

```jsx
<Child style={{ color: 'red' }} />
```

- 매 렌더마다 새 객체 생성
- 참조값 변경 -> memo 무력화

❌ 함수 props

```jsx
<Child onClick={() => console.log('햐')} />
```

- 함수도 매번 새로 생성됨

8. 해결책: useMemo + useCallback

- 객체 -> useMome

```jsx
const style = useMemo(() => ({ color: 'red' }), []);
<Child style={style} />;
```

함수 → useCallback

```jsx
const handleClick = useCallback(() => {
  console.log('hi');
}, []);

<Child onClick={handleClick} />;
```

👉 React.memo + useCallback / useMemo는 세트

9. props 비교 함수 직접 정의하기

```jsx
// 고차 컴포넌트 (HOC)
// 1번 예제 memo(Component, callback(이전props, 다음props))
export default memo(TodoItem, (prevProps, nextProps) => {
  // 반환값에 따라, Props가 바뀌었는지 안바뀌었는지 판단
  // True -> Props 바뀌지 않음 -> 리렌더링 X
  // False -> props 바뀜 -> 리렌더링 O
  // ⚠️ 거의 안 씀 (유지보수 어려움)
  if (prevProps.id !== nextProps.id) return false;
  if (prevProps.isDone !== nextProps.isDone) return false;
  if (prevProps.content !== nextProps.content) return false;
  if (prevProps.date !== nextProps.date) return false;

  // 위에 값이 바뀌지 않았다면 trun를 리턴
  return true;
});

// 2번예제
const Child = React.memo(
  function Child({ value }) {
    return <div>{value}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.value === nextProps.value;
  },
);
```

true 반환 → 렌더링 스킵
false 반환 → 렌더링
⚠️ 거의 안 씀 (유지보수 어려움)

10. 언제 써야 하고 언제 쓰지 말아야 하나?

✅ 써야 할 때

- 리스트 아이템
- 카드 컴포넌트
- 버튼, 아이콘
- 렌더링 비용 큰 컴포넌트
- props 변경 빈도 낮음

❌ 굳이 안 써도 될 때

- 단순 컴포넌트
- props 자주 변경됨
- premature optimization

11. useMemo vs React.memo 차이
    구분 React.memo useMemo
    대상 컴포넌트 값
    목적 렌더링 스킵 연산 결과 캐싱
    기준 props 비교 의존성 배열

12. 한 문장 요약

- React.memo는 "props가 안 바뀌었으면 이 컴포넌트는 다시 그리지 마" 라는 렌더링 최적화 장치
