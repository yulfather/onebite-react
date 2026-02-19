import Header from '../components/Header';
import Button from '../components/Button';

function Home() {
  return (
    <div>
      <Header
        title={'2026-02-17'}
        leftChild={<Button text={'<'} />}
        rightChild={<Button text={'>'} />}
      />
    </div>
  );
}

export default Home;
