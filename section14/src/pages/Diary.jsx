import { useParams, useNavigate } from 'react-router-dom';
import { getStringedDate } from '../util/get-stringed-date';

import Header from '../components/Header';
import Button from '../components/Button';
import Viewer from '../components/Viewer';
import useDiary from '../hooks/useDiary';

function Diary() {
  const params = useParams();
  const nav = useNavigate();

  const curDiaryItem = useDiary(params.id);

  if (!curDiaryItem) {
    return <div>로딩중</div>;
  }

  const { createdDate, emotionId, content } = curDiaryItem;

  return (
    <div>
      <Header
        title={`${getStringedDate(new Date(createdDate))} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={'< 뒤로가기'} />}
        rightChild={
          <Button
            onClick={() => nav(`/edit/${params.id}`)}
            text={'수정하기'}
            type={'POSITIVE'}
          />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
}

export default Diary;
