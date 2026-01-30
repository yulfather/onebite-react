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

3) 작동원리(핵심 메커니즘)

- HOC는 보통 이렇게 동작

1. withX(Component)호출
2. 내부에서 function Wrapped(props) {...} 같은 새 컴포넌트를 정의
3. 새 컴포넌트가

- 공통 로직 수행(상태, effect, 권한 검사)
- 원본 컴포넌트에 props 전달 + 필요한 props 추가 주입

```jsx
const withX = (Component) => {
  return function Wrapped(props) {
    //공통로직
    const injected = ...;

    //원보 컴포넌트 렌더 + props 전달/주입
    return <Componet {...props} {...injected} />;
  };
};
```

✅ 중요한 포인트

원본 컴포넌트는 그대로, 바깥에서 “감싸서” 기능을 추가
HOC가 반환한 컴포넌트는 결국 “새 컴포넌트”라서 렌더 트리에 하나 더 생김

4. 실사용 예제 1: 로그인 보호(withAuth)

요구사항

- 로그인 안 한 사용자는 /login으로 보내기
- 로그인 되어 있으면 정상 렌더링

```jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 예시 :앱에서 쓰는 auth 훅 / 상태라고 가정
function useAuth() {
  return { user: { id: 1, name: 'kim' } }; // or null
}

export function withAuth(Component) {
  function AuthWrapped(props) {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if(!user) navigate("/login");
    }, [user, navigate];)

    if(!user) return null; // 또는 <Spinner />
    return <Component {...props} user={user} />;
  }

  AuthWrapped.displayName = `withAuth(${Component.displayName || Component.name || "Component"})`
  return AuthWrapped;
}
```

- 사용

```jsx
function Mypage({ user }) {
  return <div>{user.name}님의 마이페이지</div>;
}

export default withAuth(Mypage);
```

✅ MyPage는 auth 로직을 몰라도 됨
✅ 여러 페이지에 반복 적용 가능
