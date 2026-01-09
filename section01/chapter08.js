// 1. null 병합 연산자
// -> 존재하는 값을 추려내는 기능
// -> null, undefined가 아닌값을 찾아내는 연산자
let var1;
let var2 = 10;
let var3 = 20;

const vars = [var1, var2, var3];
const validVars = vars.filter(v => v != null);

console.log(validVars);