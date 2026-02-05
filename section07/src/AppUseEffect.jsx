import './App.css';
import Viewer from './components/Viewer';
import Controller from './components/Controller';
import { useState, useEffect, useRef } from 'react';
import Even from './components/Even';

function AppUseEffect() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  const [width, setWidth] = useState(window.innerWidth);

  // 마운트 이후 업데이트 발생 순간에만 호출하게 만들기 useRef()활용
  const isMount = useRef(false);

  // 1. 마운트 : 탄생
  // -> 처음 마운트 되고 다시 실행하지 않음
  //  \> 컴포넌트가 마운트 되었을 때에만 최초로 한번 실행 시키고 싶다면
  //   \> useEffect호출 하여 deps로는 빈배열을 전달
  useEffect(() => {
    console.log('마운트');
  }, []);

  // 2. 업데이트 : 변화, 리렌더링
  // deps생략
  //  \> 리렌더링(업데이트)이 발생하면 계속실행
  // useEffect(() => {
  //   console.log('계속 업데이트');
  // });
  // - 리렌더링 이후 마운트 업데이트 동시 실행 문제
  //  \> 마운트 이후 업데이트 순간에만 호출
  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    console.log('최초 업데이트');
  });

  // 3. 언마운트 : 정리, cleanup

  useEffect(() => {
    console.log(`count: ${count} / input: ${input} / width: ${width}`);

    const onResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', onResize);

    return () => {
      console.log('cleanup정리');
      window.removeEventListener('resize', onResize);
    };
  }, [count, input, width]);

  const onClickButton = (value) => {
    setCount(count + value);
  };

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <div>width: {width}</div>
      </section>
      <section>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        {input}
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

export default AppUseEffect;
