import './DiaryList.css';
import Button from './Button';
import DiaryItem from './DiaryItem';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function DiaryList({ data }) {
  const nav = useNavigate();

  const [sortType, setSortType] = useState('latest');

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    return data.toSorted((a, b) =>
      sortType === 'oldest'
        ? Number(a.date) - Number(b.date)
        : Number(b.date) - Number(a.date),
    );
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={'latest'}>최신순</option>
          <option value={'oldest'}>오래된순</option>
        </select>
        <Button
          text={'새 일기쓰기'}
          type={'POSITIVE'}
          onClick={() => nav('/new')}
        />
        <Button text={'TodoList'} onClick={() => nav('/todo')} />
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
