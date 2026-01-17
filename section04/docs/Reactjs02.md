1. Node.js 패키지 생성
2. React 라이브러리 설치
3. vite@
   -> 차세대 프론트엔드 개발 툴 기본 설정이 적용된 React App 생성가능
   -> 설치할 상위 폴더에 명령어 입력
   -> npm create vite@latest
   ->React또한 npm에 등록된 javascript 라이브러리라 보면된다

- 생성된 폴더

1. public : 코드가 아닌 정적인 파일 보관(이미지, 폰트, 동영상)
2. src : 우리가 작성하게될 코드 보관(react, javascript code)
3. eslintrc.cjs : eslint파일의 설정파일(코드스타일을 통일하는데 도움)
4. gitignore : git에 업데이트 제한되는 파일 설정(env, node_modules)
5. index.html : html 코드(react앱에 기본 틀)
6. vite.config.js : vite라는 도구의 옵션설정

- package.json
  "script": {
  "dev": "vite", // 개발시 실행 하는 명령어
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
  }

- npm 서버 실행 : npm run dev
  -> h + enter하면 사용할 수 있는 명령어 모음

1. r + enter : 서버 다시 실행
1. u + enter : 서버의 주소를 다시보여줌
1. o + enter : 브라우저에서 서버주소로 접근하게 해줌
1. c + enter : console 클리어
1. q + enter : 나가기
