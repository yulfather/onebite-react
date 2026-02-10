import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';

import { useState } from 'react';

function Home() {
  const [pivotDate, setPivotDate] = useState(() => new Date());

  const IncreaseDate = () => {
    setPivotDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const DecreaseDate = () => {
    setPivotDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={DecreaseDate} text={'<'} />}
        rightChild={<Button onClick={IncreaseDate} text={'>'} />}
      />
      <DiaryList />
    </div>
  );
}

export default Home;
