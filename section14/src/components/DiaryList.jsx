import './DiaryList.css';
import DiaryItem from './DiaryItem';
import Button from './Button';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DiaryList({ data }) {
  const [sortType, setSortType] = useState('latest');

  const nav = useNavigate();

  const getSortedData = () => {
    return data.toSorted((a, b) =>
      sortType === 'oldest'
        ? Number(a.createdDate) - Number(b.createdDate)
        : Number(b.createdDate) - Number(a.createdDate),
    );
  };

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const sortedData = getSortedData();

  // list형태로 UI나 컴포넌트를 렌더링할때 key값을 설정해야된다.

  return (
    <div className="DiaryList">
      <div onChange={onChangeSortType} className="menu_bar">
        <select>
          <option value={'latest'}>최신순</option>
          <option value={'oldest'}>오래된순</option>
        </select>
        <Button
          onClick={() => nav('/new')}
          text={'새 일기 쓰기'}
          type={'POSITIVE'}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default DiaryList;
