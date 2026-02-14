import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../context/DiaryContext';

import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import useDiary from '../hooks/useDiary';

function Edit() {
  const params = useParams();

  const nav = useNavigate();

  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  const curDiaryItem = useDiary(params.id);
  if (!curDiaryItem) {
    return null;
  }

  const onClickDelete = () => {
    if (window.confirm('정말 삭제?')) {
      onDelete(params.id);
      nav('/', { replace: true });
    }
  };

  const onSubmit = (input) => {
    onUpdate(params.id, input.createdDate, input.emotionId, input.content);
    nav('/', { replace: true });
  };

  return (
    <div>
      <Header
        title={'일기 수정 하기'}
        leftChild={<Button onClick={() => nav(-1)} text={'< 뒤로가기'} />}
        rightChild={
          <Button onClick={onClickDelete} text={'삭제하기'} type={'NEGATIVE'} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
}

export default Edit;
