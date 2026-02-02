import './Editor.css';
import { useState, useRef, useContext } from 'react';
import { TodosDispatchContext } from '../context/TodoContext';

function Editor() {
  const { onCreate } = useContext(TodosDispatchContext);
  const [content, setContent] = useState('');
  const [isError, setIsError] = useState(false);
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (content === '') {
      setIsError(true);
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setIsError(false);
    setContent('');
  };

  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        onKeyDown={onKeydown}
        onChange={onChangeContent}
        placeholder="새로운 todos...."
        className={`editor-input ${isError ? 'error' : ''}`}
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
}

export default Editor;
