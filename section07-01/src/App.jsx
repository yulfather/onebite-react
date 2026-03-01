import { useState, useEffect, useRef } from 'react';
import './App.css';
import Viewer from './components/Viewer';
import Controller from './components/Controller';
import Even from './components/Even';

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  const isMount = useRef(false);

  // 1. Mount : 탄생 -> deps 빈배열
  // -> deps에 입력한 값이 변경되야만 실행
  // -> 컴포넌트가 마운트 되었을때 최초 한번실행 목적인 코드

  // - 응용 : 컴포턴트가 마운트될때 어떤 데이터를 불러온다.
  useEffect(() => {
    console.log('mount');
  }, []);

  // 2. Update : 변화, 리렌더링 -> deps 생략
  // -> 마운트 한번 실행 후 해당컴포넌트가 리렌더링 될때 마다 실행
  // -> 즉 업데이트가 발생 할때마다 계속 실행

  // - 응용 : 업데이트 되었을때 현재 업데이트된 스테이트값이 정상인지 검사 기능..
  useEffect(() => {
    console.log('mount + update');
  });

  // 2-1. mount 시점을 제외하고 컴포넌트가 업데이트 순간에만 콜백함수를 실행
  // -> App 컴포넌트가 마운트 여부를 판단하는 변수를 useRef를 이용해서 생성
  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    console.log('update');
  });

  useEffect(() => {
    console.log(`count: ${count} / input: ${input}`);
  }, [count, input]);
  // 의존성 배열 dependency array
  // -> deps

  const onClickButton = (value) => {
    setCount(count + value);
  };

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </section>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App;
