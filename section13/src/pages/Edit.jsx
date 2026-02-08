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

  const onClickDelete = () => {
    // 브라우져에 팝업창을 띄워서 확인 취소 선택에 따라 boolean값을 반환
    if (window.confirm('정말 삭제 하시겠습니까? 다시 복구되지 않습니다.')) {
      onDelete(params.id);
      nav('/', { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm('정말로 일기수정?')) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content,
      );
      nav('/');
    }
  };

  return (
    <div>
      <Header
        title={'일기 수정하기'}
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
