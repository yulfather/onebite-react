import Header from '../components/Header';
import Editor from '../components/Editor';
import List from '../components/List';

function Todo() {
  return (
    <div>
      <Header title={'오늘은📅'} date={new Date().toLocaleDateString()} />
      <Editor />
      <List />
    </div>
  );
}

export default Todo;
