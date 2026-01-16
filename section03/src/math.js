// Node.js 모듈 시스템 이해하기

// 1. Node.js에서 "모듈"이란 무엇?

// 정의
// -> 모듈(Module)이란
// 하나의 파일을 하나의 독립된 실행 단위 + 스코프로 취급하는 Node.js의 코드 분리 시스템

// Node.js에서 "파일하나 = 모듈하나"
// math.js -> 하나의 모듈
// user.js -> 하나의 모듈
// index.js -> 하나의 모듈

// 2. 왜 모듈이 필요한가(문제 -> 해결)

// 모듈이 없다면
// 전역 스코프 오염, 이름충돌(변수충돌)
// 파일 간 의존 관계 추적 불가, 유지보수 지옥

// 모듈을 사용하면
// - 파일 단위로 스코프 격리
// - 필요한 기능만 명시적으로 가져오기
// - 의존성 구조가 명확

// 3. Node.js 모듈 시스템의 핵심 구조
// -> Node.js에는 두 가지 모듈 시스템이 있다.
// 구분         방식	       사용문법
// CommonJS	   기본(전통)	   require, module.exports
// ES Module	 최신표준	     import, export

// PART1. CommonJS(Node.js 기본 모듈 시스템)

// 4. CommonJS 기본구조
// -> package.json {"type: "commonJS"}

// 파일math.js
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

// 외부공개 코드
// 사용하려면 -> package.json {"type: "commonJS"}
// module.exports = {
//   add,
//   sub,
// };

// 파일index.js
// const math = require('./math');
// console.log(math.add(2, 3));

// 5. module.exports의 정체
// -> Node.js는 모든 파일을 아래처럼 감싸서 실행
// (function (exports, require, module, __filename, __dirname)) {
//    내가 작성한 코드
// }
// 키워드	             의미
// module.exports	    이 모듈이 외부에 제공할 값
// exports	          module.exports의 참조
// require()	        다른 모듈을 불러오는 함수
// __filename	        현재 파일 경로
// __dirname	        현재 디렉터리 경로

// 6. exports vs module.exports(중요)
// ✅올바른 사용
// exports.add = add;
// exports.sub = sub;

// ❌잘못된 사용
// exports = {add, sus}; ❌연결끊김

// 이유
// - exports는 참조 변수
// - module.exports가 진짜 반환대상
//  -> 실무권장: 항상 module.exports사용

// 7. require의 동작 원리(중요)

// 내부에서 벌어지는 일
// 1) 파일경로 해석
// 2) 파일 최초 실행
// 3) module.exports결과저장
// 4) 캐시
// 5) 이후 require는 캐시 반환
//  - require('./math');
//  - require('./math'); 다시실행❌ / 캐시반환

// 8. require가능한 것들
// require('./file'); - 사용자 파일
// require('fs'); - 내장모듈
// require('exports'); - npm 모듈

// PART2. ES Module(ESM)

// 9. ES Module사용조건
// -> package.json {"type: "module"}
// -> 확장자 math.mjs

// 10. EMS 기본문법

// Named export방법
// 파일math.js
export function add2(a, b) {
  return a + b;
}
export function sub2(a, b) {
  return a - b;
}

function add3(a, b) {
  return a * b;
}

function sub3(a, b) {
  return a / b;
}

export { add3, sub3 };

// 파일 index.js
// import {add2, sub2} from './math.js';
// console.log(add2(1, 2));

// Default export방법
export default function multiplay(a, b) {
  return a * b;
}

// 11. default export vs named export

// Named export - 이름을 유지한 채 여러 개 export 가능
// export function add() {}
// export function sub() {}
// export {add3, sub3};
// import {add} from './math.js';

// Default export - “대표값”으로 1개만 export 가능
// export default function add() {}
// import add from './math.js';

// 실무권장
// - 라이브러리 -> default
// - 유틸모음 -> named

// 12. CommonJS vs ESM 비교 (핵심 요약)
// 항목	            CommonJS	        ES Module
// 문법	            require	          import
// 로딩	            동기	             정적분석
// Node기본	        O	                 △
// 브라우저 호환	   ❌	              ✅
// Tree Shaking	   ❌	              ✅

// Node.js 라이브러리 사용하기
// -> 프로그램을 개발할 때 필요한 다양한 기능들을 미리 만들어 모듈화 해 놓은 것
//  - 날짜, 수학, 그래픽 라이브러리

// 사용방법
// www.npmjs.com에서 모든 라이브러리를 사용할 수 있다.

// 예제
// 검색창에 필요한 라이브러리명을 검색
// randomcolor -> 페이지에 라이브러리명 클릭

// install 명령어 복사수 vscode terminal에 명령어 실행
// package.json에 "dependencies" 추가됨
//  - "dependencies": {"randomcolor": "^0.6.2"}

// node_modules라는 폴더생성
// -> (설치한 라이브러리가 저장된곳)

// package-lock.json 파일생성
// -> packege가 사용하고 있는 라이브러리나 정보들을
//    기존 package.json보다 정확하고 엄밀하게 저장하는 파일
// 다른점
// package.json에 dependensies에 정보를 보면 version에 "randomcolor": "^0.6.2" 이런식으로 표시됨
// "^" <- 대략적인 버전을 의미함(0점대 버전부터 1점대 버전중 최신버전을 사용하겠다라는 의미)

// package-lock.json - 자세한 정보들이 입력됨
// "version": "0.6.2",
// "resolved": "https://registry.npmjs.org/randomcolor/-/randomcolor-0.6.2.tgz",
// "integrity": "sha512-Mn6TbyYpFgwFuQ8KJKqf3bqqY9O1y37/0jgSK/61PUxV4QfIMv0+K2ioq8DfOjkBslcjwSzRfIDEXfzA9aCx7A==",
// "license": "CC0"

// 실용팁
// 사용중 node_modules 및 package-lock.json파일이 사라졌다면
// 기본 package.json에 dependensies가 남아있다면
// 명령어 npm install / npm i 입력하여 복구할 수 있다
//  -> dependencies에 남아있는 라이브러리 기준 모든복구 가능

// 따라서
// git에 코드를 업로드 할경우 node_modules폴더는 업로드하지 않는다
// npm i 명령어로 다른컴퓨터 및 다른사용자가 쉽게 복구가능
