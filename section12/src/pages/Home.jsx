import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';
import { DiaryStateContext } from '../App';
import { useState, useContext } from 'react';

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0,
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59,
  ).getTime();

  return data.filter(
    (item) =>
      beginTime <= item.createdDate &&
      item.createdDate <= endTime,
  );
};

// useSearchParams 훅을 사용하여 구조분해할당으로 사용
// 현재 브라우저에 명시한 url 파라미터 값을 가져온다.
// 훅 내부 프로퍼티로 params.get('value') 사용
function Home() {
  const [pivotDate, setPivotDate] = useState(new Date());
  const data = useContext(DiaryStateContext);

  const monthlyData = getMonthlyData(pivotDate, data);

  const onIncreaseMonth = () => {
    setPivotDate(
      new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth() + 1,
      ),
    );
  };
  const onDecreaseMonth = () => {
    setPivotDate(
      new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth() - 1,
      ),
    );
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={
          <Button onClick={onDecreaseMonth} text={'<'} />
        }
        rightChild={
          <Button onClick={onIncreaseMonth} text={'>'} />
        }
      />
      <DiaryList data={monthlyData} />
    </div>
  );
}

export default Home;
