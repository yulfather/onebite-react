// 1. 반목문 for, forin, forEach
// (초기식; 조건식; 증감식) 입력
for(let i = 1; i <= 10; i++) {
  if(i % 2 === 1) {
    continue;
  }
  console.log(`${i}증가되었습니다.`);
  if(i >= 5) {
    break;
  }
}