React의 기술적인 특징

1. 컴포넌트를 기반으로 UI를 표현
   -> 재사용성 활용, 중복코드 제한 기능
   -> 컴포넌트 : Header.js, Footer.js, Body.js

2. 화면 업데이트가 쉽다.
   -> 선언형 프로그래밍으로 동작 : 과정생략 목적만 간결히 명시
   \_> 토마토 파스타 주세요 만드는 과정은 필요없어요

-> 명령형 프로그래밍 : 목적달성에 따른 일련과정 설명

-> React : 선언형프로그래밍(목적만 깔끔하게 명시 코드간결)
-> Javascript : 명령형 프로그래밍(모든과정 전부설명 필요 코드복잡)

3. State
   -> 컴포넌트에는 State라는 각가의 컴포넌트의 상태를 설정하는 변수존재
   -> State의 변수값 설정에 따라 렌더링 결과가 변경됨
   -> 하나의 컴포넌트로 다르게 UI를 렌더링 할 수 있음

4. 화면 업데이트가 빠르게 처리
   -> HTML -> DOM
   RenderTree -> Layout(오래걸리는구간) -> Painging(오래걸리는구간)
   -> CSS -> CSSOM
   -> Reflow: Layout을 다시함 / Repaint: Painging을 다시함
   : js로 DOM을 수정하게 되면 RenderTree를 다시 거치게 되어 Reflow 및 Repaint를 다시하게됨
   : 따라서 여러번 DOM을 조작하는 코드는 서비스 속도저하 요인이 됨

- DOM을 여러번 조작하는 코드 Super Bad Practice
  -> 3000번 DOM을 수정
  -> 성틍 측정결과: 4,500ms
  <script>
    function onClick() {
      const $ul = document.getElementById("ul");
      for(let i = 0; i < 3000; i++) {
        $ul.innerHTML += `<li>${i}</li>`;
      }
    }
  </script>
  <body>
    <button onclick="onClick()">리스트추가</button>
    <ul id="ul"></ul>
  </body>

- 수정된코드 Good Practice
  -> DOM은 딱 한번만 수정함
  -> 성능 측정 결과: 250ms (22배 개선 됨)
  <script>
    function onClick() {
      const $ul = document.getElementById("ul");
  
      let list = "";
      
      for(let i = 0; i < 3000; i++) {
        list += `<li>${i}</li>`;
      }
  
      $ul.innerHTML = list;
    }
  </script>
  <body>
    <button onclick="onClick()">리스트추가</button>
    <ul id="ul"></ul>
  </body>

-> 다양한 업데이트 및 동시에 발생한 업데이트를 다모아서 한번에 수정
-> 서비스 규모가 커질수록 이러한 한번에 모아서 수정하는 작업이 어려워진다.
-> React는 이러한 과정을 자동으로 함(Feat. Virtual DOM)
