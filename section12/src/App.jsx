import './App.css';
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Notfound from './pages/Notfound';
import Button from './components/Button';
import Header from './components/Header';

import { getEmotionImage } from './util/get-emotion-image';

// 1. "/" : 모든 일기를 조회하는 Home 페이지를 렌더링
// 2. "/new" : 새로운 일기를 작성하는 new페이지 렌더링
// 3. "/diary" : 일기를 상세히 조회하는 Diary페이지 렌더링

// -> <Routes><Route path="/경로"/ element={<component페이지/>}></Routes>
// -> path : 경로 입력 주소 http://localhost:5173/"입력한 경로"
// -> element : 해당 경로에서 렌더링하고자 하는 컴포넌트 입력
// -> path="*" -> 와일드카드 switch case문에 default개념
//  -> 위에 있는 페이지 주소 외에 주소는 Notfound주소로 이동

// 주의사항
// 1. <Routes> 컴포넌트 안에는 <Route>컴포넌트만 들어올 수 있음
// 2. <Routes> 밖에 입력된 테그들은 모든 페이지에 적용
//  -> 페이지마다 공통적으로 배치될 컴포넌트에만 적용

// CSR -> client side rendering 클라이언트 사이드 렌더링
//  -> 이전 페이지를 날리지 않고 필요한 컴포넌트만 교체
// Link 컴포넌트 사용 a테그랑 같은 기능을 하지만 Link컴포 넌트는 CSR적용
// a테그는 CSR 적용 되지 않음

// useNavigate라는 커스텀 훅은 페이지를 실제로 이동 시켜주는 Naivgate함수를 반환

// public 폴더 이미지 : <img src={주소} /> "이미지 최적화 적용안됨"
// -> 저장 위치에서 그대로 불러오는 구조 상대적 느림
// -> 대용량 이미지는 보관이 가능

// assets 폴더 이미지 : import로 불러와서 <img src={emotion1} /> "이미지 최적화 적용"
// -> 브라우저 메모리 보관 되어 업로드 속도 0임
// -> 빠르지만 대용량 이미지에는 한계가 있음
// -> 소량 저장유리
function App() {
  const nav = useNavigate();

  const onClickButton = () => {
    nav('/new');
  };

  return (
    <>
      <Header
        title={'Header'}
        leftChild={<Button text={'Left'} />}
        rightChild={<Button text={'Right'} />}
      />

      <Button
        text={'123'}
        type={'DEFAULT'}
        onClick={() => {
          console.log('123번');
        }}
      />

      <Button
        text={'123'}
        type={'POSITIVE'}
        onClick={() => {
          console.log('123번');
        }}
      />

      <Button
        text={'123'}
        type={'NEGATIVE'}
        onClick={() => {
          console.log('123번');
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
