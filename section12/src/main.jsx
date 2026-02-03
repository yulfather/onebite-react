import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// import { BrowserRouter } from 'react=router-dom' 해서 불러옴
createRoot(document.getElementById('root')).render(
  // 테그형태로 App컴포 넌트를 부모 컴포넌트로 감싸준다
  // BrowserRouter는 브라우저에 현재 주소를 저장하고 감지하는 역할
  // 따라서 React 앱의 모든 컴포넌트들이 현재 주소를 불러와서 사용가능
  // 현재 주소의 변화를 감지할 수 도있다
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
