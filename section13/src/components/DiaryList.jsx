import './DiaryList.css';
import DiaryItem from './DiaryItem';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function DiaryList({ data }) {
  const nav = useNavigate();

  const [sortType, setSortType] = useState('latest');

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  // sort() -> 원본배열 변경
  // toSorted() -> 새로운 배열 반환\
  // -> 리엑트는 state순서가 바뀌면 안됨
  const getSortedData = () => {
    return data.toSorted((a, b) =>
      sortType === 'oldest'
        ? Number(a.createdDate) - Number(b.createdDate)
        : Number(b.createdDate) - Number(a.createdDate),
    );
  };

  // const getSortedData = () => {
  //   return data.toSorted((a, b) => {
  //     if (sortType === 'oldest') {
  //       Number(a.createdDate) - Number(b.createdDate);
  //     } else {
  //       Number(b.createdDate) - Number(a.createdDate);
  //     }
  //   });
  // };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
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
