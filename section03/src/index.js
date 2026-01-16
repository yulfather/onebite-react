// CJS - CommonJS - requir 모듈 가져오기

// 개별로 가져오기
// const math = require("./math");
// console.log(math.add(2, 3));

// 구조분해로 가져오기
// const {add, sub} = require("./math");
// console.log(add(2, 3));
// console.log(sub(4, 5));

// ESM - ES Module - import로 가져오기

// Named import - import {함수1, 함수2} from './모둘.js';
// Default import - import 함수명 from './모듈.js';
// import { add2, sub2, add3, sub3 } from "./math.js";

// 동일한 모듈에서 함수를 불러올경우 named와 default방식 동시에 사용 가능하다.
import multiPlay, { add2, sub2, add3, sub3 } from "./math.js";

console.log(sub2(3, 2));
console.log(add2(3, 5));

console.log(add3(23, 41));
console.log(sub3(6, 2));

// default import - import 함수명 from '.모듈.js'
// 불러올때 함수명은 변경이 가능
// import multiPlay from "./math.js";

console.log(multiPlay); // [Function: multiplay]
console.log(multiPlay(4, 2)); // 8

// randomcolor 라이브러리사용하기
// 라이브러리를 import로 가져올때 설치확인 후 라이브러리명만 입력"randomcolor"
import randomColor from "randomcolor";

const color = randomColor();
console.log(color); // #1d237f
