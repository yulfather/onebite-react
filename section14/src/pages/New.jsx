import Header from '../components/Header';
import Button from '../components/Button';

import { useNavigate } from 'react-router-dom';

function New() {
  const nav = useNavigate();

  return (
    <div>
      <Header
        title={'새 일기 쓰기'}
        leftChild={<Button onClick={() => nav(-1)} text={'< 뒤로가기'} />}
      />
    </div>
  );
}

export default New;
