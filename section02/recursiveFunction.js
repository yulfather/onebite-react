// 1. 재귀함수란
//  -> 재귀함수는 함수가 자기 자신을 다시 호출하는 구조
// 1-1. 종료조건(Base Case): 더 이상 자기 자신을 호출하지 않는 조건
// 1-2. 재귀호출(Recursive Case): 문제를 더 작은 문제로 나누어 자기 자신을 호출

// 2. 재귀함수의 동작원리(Call Stack관점)
// 재귀는 반복문처럼 "한 줄식" 실행되는 것이 아니라,
// 호출스택(Call Stack)에 함수 실행 컨텍스트가 쌓였다가(LIFO) 역순으로 반환

// 예제: 숫자 카운트
function countDown(n) {
  if (n === 10) {
    console.log("end");
    return;
  }
  console.log(n);
  countDown(n + 1);
}
countDown(0);

// 3. 재귀의 본질 : "쪼개서 위임"
//  -> 재귀는 현재 문제를 해결하지 않는다는 점이 중요
//  -> 현재 함수는 "내가 할 일"만 하고, 나머지는 미래의 나에게 위임
// return n * factorial(n - 1);
// n * 까지만 계산
// 나머지는 factorial(n - 1)이 끝나면 자동으로 이어짐

// 4. 대표적인 기초 예제(팩토리얼)
function factorial(n) {
  // console.log(n);
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
factorial(4);
console.log(factorial(4)); // 24(4 * 3 * 2 * 1)
// 내부동작
// factorial(4)
// = 4 * factorial(3)
// = 4 * (3 * factorial(2))
// = 4 * (3 * (2 * factorial(1)))
// = 4 * 3 * 2 * 1 === 24
// 포인트
// 계산은 호출 단계가 아니라 반환 단계에서 이루어진다.
// 그래서 재귀는 "쌓았다가 풀어낸다"

// 5. 실무예제 1) 중첩 데이터 구조 탐색(매우중요)
//  -> 트리구조, 댓글 대댓글, 카테고리 구조는 반복문으로 처리하기 까다롭다.
const categories = [
  {
    id: 1,
    name: "전자기기",
    children: [
      {
        id: 2,
        name: "노트북",
        children: [{ id: 3, name: "맥북" }],
      },
    ],
  },
];
// 특정 id찾기(재귀)
// function findCategory(list, targetId) {
//   for (let item of list) {
//     if (item.id === targetId) return item;
//     if (item.children) {
//       const found = findCategory(item.children, targetId);
//       if (found) return found;
//     }
//   }
//   return null;
// }
// findCategory(categories, 3);
// console.log(findCategory(categories, 3));
function findCategories(list, targetId) {
  // 파라미터로 전달 list = categories, targetId = 3
  for (let item of list) {
    // item = list 배열을 실행
    if (item.id === targetId) return item; // 배열에 속해있는 객체의 id값의 동일성 판단
    if (item.children) {
      // 객체 key값이 children이 있다면 아래코드 실행

      // findCategories(item.children, targetId) -> 실행되던 함수는 멈춤
      // id값이 3인 id값을 찾을때까지 순회, 못찾으면 null을 반환
      const found = findCategories(item.children, targetId);
      if (found) return found;
    }
  }
  return null;
}
findCategories(categories, 3); // 최초호출
