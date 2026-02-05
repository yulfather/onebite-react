import { useContext, useState, useEffect } from 'react';
import { DiaryStateContext } from '../App';
import { useNavigate } from 'react-router-dom';

function useDiary(id) {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();

  const nav = useNavigate();

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id),
    );

    if (!currentDiaryItem) {
      window.alert('여기오시면 안되요');
      nav('/', { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [id]);

  return curDiaryItem;
}

export default useDiary;
