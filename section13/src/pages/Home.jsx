import { useSearchParams } from 'react-router-dom';

function Home() {
  const [params, setParams] = useSearchParams();
  console.log(params.get('value'));
  return <div>Home</div>;
}

export default Home;
