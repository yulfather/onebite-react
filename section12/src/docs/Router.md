1. import { BrowserRouter } from 'react=router-dom' 해서 불러옴

- 테그형태로 App컴포 넌트를 부모 컴포넌트로 감싸준다
- BrowserRouter는 브라우저에 현재 주소를 저장하고 감지하는 역할
- 따라서 React 앱의 모든 컴포넌트들이 현재 주소를 불러와서 사용가능 현재 주소의 변화를 감지할 수 도있다

2. "/" : 모든 일기를 조회하는 Home 페이지를 렌더링
3. "/new" : 새로운 일기를 작성하는 new페이지 렌더링
4. "/diary" : 일기를 상세히 조회하는 Diary페이지 렌더링

<Routes><Route path="/경로"/ element={<component페이지/>}></Routes>
-> path : 경로 입력 주소 http://localhost:5173/"입력한 경로"
-> element : 해당 경로에서 렌더링하고자 하는 컴포넌트 입력
-> path="\*" -> 와일드카드 switch case문에 default개념
-> 위에 있는 페이지 주소 외에 주소는 Notfound주소로 이동

// 주의사항
// 1. <Routes> 컴포넌트 안에는 <Route>컴포넌트만 들어올 수 있음
// 2. <Routes> 밖에 입력된 테그들은 모든 페이지에 적용
// -> 페이지마다 공통적으로 배치될 컴포넌트에만 적용

// CSR -> client side rendering 클라이언트 사이드 렌더링
// -> 이전 페이지를 날리지 않고 필요한 컴포넌트만 교체
// Link 컴포넌트 사용 a테그랑 같은 기능을 하지만 Link컴포 넌트는 CSR적용
// a테그는 CSR 적용 되지 않음

// useNavigate라는 커스텀 훅은 페이지를 실제로 이동 시켜주는 Naivgate함수를 반환

5. 동적경로(Dynamic Segment)란?

- URL Parameter
  -> /뒤에 아이템에 id를 명시
  ~/product/1
  ~/product/2
  ~/product/3
  -> 아이템의 id 등의 변경되지 않는 값을 주소로 명시하기 위해 사용

- Query String
  -> ?뒤에 변수명과 값 명시
  ~/search?q=검색어
  -> 검색어 등의 자주 변경되는 값을 주소로 명시하기 위해 사용

6. 이미지 경로
   // public 폴더 이미지 : <img src={주소} /> "이미지 최적화 적용안됨"
   // -> 저장 위치에서 그대로 불러오는 구조 상대적 느림
   // -> 대용량 이미지는 보관이 가능

   // assets 폴더 이미지 : import로 불러와서 <img src={emotion1} /> "이미지 최적화 적용"
   // -> 브라우저 메모리 보관 되어 업로드 속도 0임
   // -> 빠르지만 대용량 이미지에는 한계가 있음
   // -> 소량 저장유리
