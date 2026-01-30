1. HOC(고차 컴포넌트)란?

**HOC = “컴포넌트를 받아서, 더 기능이 추가된 컴포넌트를 반환하는 함수”**

```jsx
const Enhanced = withSomething(OriginalComponent);
```

- 입력: Component
- 출력: Component
- 목적: 공통 로직 재사용(횡단 관심사: auth, logging, data-fetching, 권한, 로딩 처리 등)
  -> React의 “컴포지션(조합)” 패턴 중 하나고, Hook이 나오기 전엔 특히 많이 쓰임

2. 사용 목적 (언제 쓰나)

✅ 대표적으로 HOC가 유리한 경우

1.  여러 화면에 반복되는 공통 기능을 “UI와 분리”해서 재사용할 때
    - 로그인 필요 페이지 보호(Protected Route)
    - 권한(Role) 체크
    - 로딩/에러 UI 래핑
    - 이벤트 로깅(페이지뷰/클릭 로그)

2.  기존 컴포넌트를 수정하지 않고 기능만 덧씌우고 싶을 때 (Open-Closed)

3.  라이브러리/패키지 레벨에서 일관된 래핑 제공할 때
