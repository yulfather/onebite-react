import { useSearchParams } from 'react-router-dom';

function Home() {
  // 쿼리스트링방식
  const [params, setParams] = useSearchParams();

  return <div>Home</div>;
}

export default Home;
