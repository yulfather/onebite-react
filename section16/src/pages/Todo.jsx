import Header from '../components/Header';
import Editor from '../components/Editor';
import List from '../components/List';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function Todo() {
  const nav = useNavigate();

  const onClickHome = () => {
    nav('/');
  };

  return (
    <div>
      <Header
        leftChild={<Button onClick={onClickHome} text={'HOME'} />}
        title={'오늘은📅'}
        date={new Date().toLocaleDateString()}
      />
      <Editor />
      <List />
    </div>
  );
}

export default Todo;
