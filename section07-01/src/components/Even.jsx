import { useEffect } from 'react';

// 3. Unmount : 소멸
// 콜백함수안에 콜백함수
// useEffect의 콜백함수가 반환하는 함수: 클린업, 정리함수
// -> 이 정리 함수는 useEffect가 끝날때 실행됨
// deps가 빈 배열로 전달

// 응용: 컴포넌트가 화면에서 사라질때 해당 컴포넌트의 메모리 해제 및 최적화 작업

function Even() {
  useEffect(() => {
    return () => {
      console.log('unmount');
    };
  }, []);
  return <div>짝수입니다.</div>;
}

export default Even;
