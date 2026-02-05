import { useSearchParams } from 'react-router-dom';

function Home() {
  const [params, setParams] = useSearchParams();
  return <div>Home</div>;
}

export default Home;
