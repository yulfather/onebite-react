import { useState, useEffect, useContext } from 'react';
import { DiaryStateContext } from '../context/DiaryContext';
import { useNavigate } from 'react-router-dom';

function useDiary(id) {
  const data = useContext(DiaryStateContext);
  const nav = useNavigate();
  const [curDiaryItem, setCurDiaryItem] = useState();

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id),
    );

    if (!currentDiaryItem) {
      alert('존재하지 않는 일기입니다.');
      nav('/', { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [id]);

  return curDiaryItem;
}

export default useDiary;
