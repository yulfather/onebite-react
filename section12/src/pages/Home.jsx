import { useSearchParams } from 'react-router-dom';

// useSearchParams 훅을 사용하여 구조분해할당으로 사용
// 현재 브라우저에 명시한 url 파라미터 값을 가져온다.
// 훅 내부 프로퍼티로 params.get('value') 사용
function Home() {
  const [params, setParams] = useSearchParams();
  console.log(params.get('value'));
  return <div>Home</div>;
}

export default Home;
