import './App.css';
import BigHeader from './components/BigHeader';
import Main from './components/Main';
import Button from './components/Button';
import { useState } from 'react';

function Header() {
  return (
    <header>
      <h1>header</h1>
    </header>
  );
}

const Body = ({ count }) => {
  return (
    <div>
      <h2>{count}</h2>
    </div>
  );
};

const Footer = ({ title }) => {
  return <div>{title}</div>;
};

function App() {
  const [count, setCount] = useState(1);

  const onClickButtonPlus = () => {
    setCount(count + 1);
  };

  const onClickButtonMinus = () => {
    setCount(count - 1);
  };

  const onClickButtonReset = () => {
    setCount(count * 0);
  };

  return (
    <>
      <Button onClick={onClickButtonPlus} text={'눌러'} color={'yellow'} />
      <Button onClick={onClickButtonMinus} text={'빼기'} color={'red'} />
      <Button onClick={onClickButtonReset} text={'리셋'} />
      <Header />
      <h1>안녕리엑트</h1>
      <Body count={count} />
      <Footer title={'어서오세요'} />
      <Main foo={'메인'} />
      <BigHeader />
    </>
  );
}

export default App;
