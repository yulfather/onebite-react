import { useState, useContext } from 'react';
import { DiaryStateContext } from '../context/DiaryContext';

import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(), // 년
    pivotDate.getMonth(), // 월
    1, // 일
    0, // 시간
    0, // 분
    0, // 초
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0, // 0일 -> 해당월에 전월 말일
    23,
    59,
    59,
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime,
  );
};

function Home() {
  // add 컴포넌트에서 state값 불러옴
  const data = useContext(DiaryStateContext);

  // 현재 날짜 state로 저장
  const [pivotDate, setPivotDate] = useState(new Date());

  // 해당월에 data를 필터링
  const monthlyData = getMonthlyData(pivotDate, data);

  // 버튼 클릭에 따라 monthly변경
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={'<'} />}
        rightChild={<Button onClick={onIncreaseMonth} text={'>'} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
}

export default Home;
